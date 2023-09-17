#include <ESP8266WebServer.h>
#include "JSONUtils.h"
#include "WiFiUtils.h"
#include "EEPROMUtils.h"
#include "DataTypes.h"
#include "config.h"

/*
   Version 5.0.0
   xx-xx-2023
*/

// LED pin to indicate the network connection status
const int WIFI_STATUS_LED = 2;
// Number of inputs connected to the device
const int INPUTS_NUMBER = 2;
// Default working time limit in minutes
const uint16_t DEFAULT_TIME_LIMIT = 30;
// Inputs pin numbers
const int INPUTS_PINS[INPUTS_NUMBER] = {5, 14};
// Outputs pin numbers
const int OUTPUTS_PINS[INPUTS_NUMBER] = {4, 12};
// Input debounce time in seconds
const int DEBOUNCE_TIME = 3;

// Status constants
const int OFF = 0;
const int WORKING = 1;
const int STOPPED = 2;

// Error codes
const String NOT_FOUND = "ERR_00";
const String INVALID_TIME_LIMIT = "ERR_01";
const String INVALID_INPUT = "ERR_02";
const String INPUT_NOT_STOPPED = "ERR_03";
const String INVALID_OUTPUT = "ERR_04";

// State variables
OutputData outputsData[INPUTS_NUMBER] = {};
uint16_t timeLimit = DEFAULT_TIME_LIMIT;

// HTTP server instance
ESP8266WebServer server(80);

void setup()
{
    // Initialize input and output pins
    pinMode(WIFI_STATUS_LED, OUTPUT);
    for (int pin : INPUTS_PINS)
    {
        pinMode(pin, INPUT_PULLUP);
    }
    for (int pin : OUTPUTS_PINS)
    {
        pinMode(pin, OUTPUT);
        digitalWrite(pin, HIGH);
    }

    // Initialize the serial communication, the EEPROM library and the WiFi connection
    Serial.begin(115200);
    beginEEPROM();
    connectToWifi(SSID, PASSWORD, IP, GATEWAY, SUBNET, WIFI_STATUS_LED);

    // Set up all the server endpoints
    server.on("/status", handleStatus);
    server.on("/clear-history", handleClear);
    server.on("/change-time-limit", handleChangeLimit);
    server.on("/resume-output", handleResume);
    server.onNotFound(handleNotFound);

    // Initialize the HTTP server
    server.begin();
}

void loop()
{
    // Handle any incoming request, if exists
    server.handleClient();

    // Loop over the given number of inputs, processing it's state
    for (int i = 0; i < INPUTS_NUMBER; i++)
    {
        // Whenever the output is on, update the current timer and make a forced stop if necessary
        if (outputsData[i].status == WORKING)
        {
            outputsData[i].currentTime = (millis() - outputsData[i].currentRunTimestamp) / 1000;
            if (outputsData[i].currentTime > timeLimit * 60)
            {
                outputsData[i].status = STOPPED;
                outputsData[i].currentTime = 0;
                digitalWrite(OUTPUTS_PINS[i], HIGH);
            }
        }

        // Read the input state
        bool reading = !digitalRead(INPUTS_PINS[i]);
        if (reading != outputsData[i].lastChange)
        {
            outputsData[i].lastChangeTimestamp = millis();
            outputsData[i].lastChange = reading;
        }

        // Take the reading as valid after the debounce is completed
        if (((millis() - outputsData[i].lastChangeTimestamp) / 1000) > DEBOUNCE_TIME)
        {
            outputsData[i].sensorStatus = reading;
        }

        // If the input is on, but the output is still off, turn on the output and save the timestamp
        if (outputsData[i].sensorStatus == true && outputsData[i].status == OFF)
        {
            outputsData[i].status = WORKING;
            outputsData[i].currentRunTimestamp = millis();
            digitalWrite(OUTPUTS_PINS[i], LOW);
        }

        // If the input is off, but the output is still on, turn off the output and process the run values
        if (outputsData[i].sensorStatus == false && outputsData[i].status == WORKING)
        {
            outputsData[i].status = OFF;
            outputsData[i].meanTime = (outputsData[i].meanTime * outputsData[i].runCount + outputsData[i].currentTime) / (outputsData[i].runCount + 1);
            outputsData[i].runCount++;
            addValueToHistory(outputsData[i].currentTime, i);
            outputsData[i].currentTime = 0;
            digitalWrite(OUTPUTS_PINS[i], HIGH);
        }
    }
}

// Adds a value to the history array of a given input, removing the oldest one to keep the array size constant
void addValueToHistory(uint16_t value, int inputNumber)
{
    int historyLength = sizeof(outputsData[inputNumber].history) / sizeof(uint16_t);
    uint16_t newHistory[historyLength];
    newHistory[0] = value;

    for (int i = 0; i < historyLength - 1; i++)
    {
        newHistory[i + 1] = outputsData[inputNumber].history[i];
    }
    for (int i = 0; i < historyLength; ++i)
    {
        outputsData[inputNumber].history[i] = newHistory[i];
    }
}

// Returns the current outputs status to the client, formatted as a JSON string
void handleStatus()
{
    String response = formatStatus(timeLimit, outputsData, INPUTS_NUMBER);
    server.send(200, "application/json", response);
}

// Clears the recorded history, mean time and run count for the specified input, validating the user input
void handleClear()
{
    String param = server.arg("input");
    char *end;
    long input = strtol(param.c_str(), &end, 10);
    if (param == "" || *end != '\0' || input > INPUTS_NUMBER - 1 || input < 0)
    {
        String response = formatError(INVALID_INPUT, "Invalid input number");
        server.send(404, "application/json", response);
    }
    else
    {
        outputsData[input].meanTime = 0;
        outputsData[input].runCount = 0;
        int historyLength = sizeof(outputsData[input].history) / sizeof(uint16_t);
        for (int i = 0; i < historyLength; i++)
        {
            outputsData[input].history[i] = 0;
        }
        server.send(200);
    }
}

// Changes the working time limit for all the outputs, validating the user input
void handleChangeLimit()
{
    String param = server.arg("time_limit");
    char *end;
    long _timeLimit = strtol(param.c_str(), &end, 10);
    if (param == "" || *end != '\0' || _timeLimit > UINT16_MAX || _timeLimit <= 0)
    {
        String response = formatError(INVALID_TIME_LIMIT, "Invalid time value");
        server.send(404, "application/json", response);
    }
    else
    {
        timeLimit = _timeLimit;
        server.send(200);
    }
}

// Resumes a given stopped output
void handleResume()
{
    String param = server.arg("output");
    char *end;
    long input = strtol(param.c_str(), &end, 10);
    if (param == "" || *end != '\0' || input > INPUTS_NUMBER - 1 || input < 0)
    {
        String response = formatError(INVALID_OUTPUT, "Invalid output number");
        server.send(404, "application/json", response);
    }
    else if (outputsData[input].status != STOPPED)
    {
        String response = formatError(INPUT_NOT_STOPPED, "The selected output is not in forced stop state");
        server.send(404, "application/json", response);
    }
    else
    {
        outputsData[input].status = OFF;
        server.send(200);
    }
}

// Returns a not found message to the client, formatted as a JSON string
void handleNotFound()
{
    String response = formatError(NOT_FOUND, "URL not found");
    server.send(404, "application/json", response);
}
