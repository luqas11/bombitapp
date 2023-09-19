#include <ESP8266WebServer.h>
#include "JSONUtils.h"
#include "WiFiUtils.h"
#include "EEPROMUtils.h"
#include "DataTypes.h"
#include "config.h"

/*
   Version 5.0.0
   19-9-2023
*/

// LED pin to indicate the network connection status
const int STATUS_LED = 13;
// Duration of the status LED blinks
const int LED_BLINK_TIME = 200;
// Number of devices connected to the system
const int DEVICES_NUMBER = 2;
// Default running time limit in minutes
const uint16_t DEFAULT_TIME_LIMIT = 30;
// Inputs pin numbers
const int INPUTS_PINS[DEVICES_NUMBER] = {5, 14};
// Outputs pin numbers
const int OUTPUTS_PINS[DEVICES_NUMBER] = {4, 12};
// Input debounce time in seconds
const int DEBOUNCE_TIME = 3;

// Status constants
const int OFF = 0;
const int RUNNING = 1;
const int STOPPED = 2;

// Error codes
const String NOT_FOUND = "ERR_00";
const String INVALID_TIME_LIMIT = "ERR_01";
const String INVALID_DEVICE = "ERR_02";
const String DEVICE_NOT_STOPPED = "ERR_03";

// Memory addresses
const int LIMIT_ADDR = 0;
const int MEAN_ADDR = LIMIT_ADDR + 1;
const int COUNT_ADDR = MEAN_ADDR + DEVICES_NUMBER;
const int HISTORY_ADDR = COUNT_ADDR + DEVICES_NUMBER;

// State variables
DeviceData devicesData[DEVICES_NUMBER] = {};
uint16_t timeLimit = DEFAULT_TIME_LIMIT;
unsigned long lastLedTimestamp;
bool isLedBlinking;

// HTTP server instance
ESP8266WebServer server(80);

void setup()
{
    // Initialize input and output pins
    pinMode(STATUS_LED, OUTPUT);
    for (int pin : INPUTS_PINS)
    {
        pinMode(pin, INPUT);
    }
    for (int pin : OUTPUTS_PINS)
    {
        pinMode(pin, OUTPUT);
        digitalWrite(pin, HIGH);
    }

    // Initialize the serial communication, the EEPROM library, the WiFi connection and the device state variables
    Serial.begin(115200);
    beginEEPROM();
    connectToWifi(SSID, PASSWORD, IP, GATEWAY, SUBNET, STATUS_LED);
    getSavedStateValues();

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

    // Set the LED state depending on the network status
    if (isLedBlinking != true)
    {
        digitalWrite(STATUS_LED, isWiFiConnected() ? LOW : HIGH);
    }

    // Turn on the status LED if the blink is finished
    if ((millis() - lastLedTimestamp) > LED_BLINK_TIME && isLedBlinking == true)
    {
        digitalWrite(STATUS_LED, LOW);
        isLedBlinking = false;
    }

    // Loop over the given number of devices, processing it's state
    for (int i = 0; i < DEVICES_NUMBER; i++)
    {
        // Whenever the device is running, update the current timer and make a forced stop if time limit is exceeded
        if (devicesData[i].status == RUNNING)
        {
            devicesData[i].currentTime = (millis() - devicesData[i].currentRunTimestamp) / 1000;
            if (devicesData[i].currentTime > timeLimit * 60)
            {
                devicesData[i].status = STOPPED;
                devicesData[i].currentTime = 0;
                digitalWrite(OUTPUTS_PINS[i], HIGH);
            }
        }

        // Read the input state and save the debounce timestamp
        bool reading = !digitalRead(INPUTS_PINS[i]);
        if (reading != devicesData[i].lastChange)
        {
            devicesData[i].lastChangeTimestamp = millis();
            devicesData[i].lastChange = reading;
        }

        // Take the reading as valid after the debounce is completed
        if (((millis() - devicesData[i].lastChangeTimestamp) / 1000) > DEBOUNCE_TIME)
        {
            devicesData[i].inputStatus = reading;
        }

        // If the input is on, but the device is still off, turn on the device and save the timestamp
        if (devicesData[i].inputStatus == true && devicesData[i].status == OFF)
        {
            devicesData[i].status = RUNNING;
            devicesData[i].currentRunTimestamp = millis();
            digitalWrite(OUTPUTS_PINS[i], LOW);
        }

        // If the input is off, but the device is still on, turn off the device and process the run values
        if (devicesData[i].inputStatus == false && devicesData[i].status == RUNNING)
        {
            devicesData[i].status = OFF;
            devicesData[i].meanTime = (devicesData[i].meanTime * devicesData[i].runCount + devicesData[i].currentTime) / (devicesData[i].runCount + 1);
            devicesData[i].runCount++;
            addValueToHistory(devicesData[i].currentTime, i);
            devicesData[i].currentTime = 0;
            digitalWrite(OUTPUTS_PINS[i], HIGH);

            writeToEEPROM(MEAN_ADDR + i, devicesData[i].meanTime);
            writeToEEPROM(COUNT_ADDR + i, devicesData[i].runCount);
            writeArrayToEEPROM(HISTORY_ADDR + i * HISTORY_LENGTH, devicesData[i].history, sizeof(devicesData[i].history));
        }
    }
}

// Read the values stored in the EEPROM and save them to the state variables
void getSavedStateValues()
{
    uint16_t _timeLimit = readFromEEPROM(LIMIT_ADDR);
    if (_timeLimit != 0)
    {
        timeLimit = _timeLimit;
    }
    for (int i = 0; i < DEVICES_NUMBER; i++)
    {
        devicesData[i].meanTime = readFromEEPROM(MEAN_ADDR + i);
        devicesData[i].runCount = readFromEEPROM(COUNT_ADDR + i);
        uint16_t savedHistory[HISTORY_LENGTH];
        readArrayFromEEPROM(HISTORY_ADDR + i * HISTORY_LENGTH, savedHistory, sizeof(savedHistory));
        for (int j = 0; j < HISTORY_LENGTH; ++j)
        {
            devicesData[i].history[j] = savedHistory[j];
        }
    }
}

// Adds a value to the history array of a given device, removing the oldest one to keep a constant array size
void addValueToHistory(uint16_t value, int deviceNumber)
{
    uint16_t newHistory[HISTORY_LENGTH];
    newHistory[0] = value;

    for (int i = 0; i < HISTORY_LENGTH - 1; i++)
    {
        newHistory[i + 1] = devicesData[deviceNumber].history[i];
    }
    for (int i = 0; i < HISTORY_LENGTH; ++i)
    {
        devicesData[deviceNumber].history[i] = newHistory[i];
    }
}

// Returns the current devices status to the client, formatted as a JSON string
void handleStatus()
{
    String response = formatStatus(timeLimit, devicesData, DEVICES_NUMBER);
    server.send(200, "application/json", response);
    blinkStatusLed();
}

// Clears the recorded history, mean time and run count for the specified device, validating the user input
void handleClear()
{
    String device = server.arg("device");
    char *end;
    long i = strtol(device.c_str(), &end, 10);
    if (device == "" || *end != '\0' || i > DEVICES_NUMBER - 1 || i < 0)
    {
        String response = formatError(INVALID_DEVICE, "Invalid device number");
        server.send(404, "application/json", response);
    }
    else
    {
        devicesData[i].meanTime = 0;
        devicesData[i].runCount = 0;
        for (int j = 0; j < HISTORY_LENGTH; j++)
        {
            devicesData[i].history[j] = 0;
        }
        writeToEEPROM(MEAN_ADDR + i, 0);
        writeToEEPROM(COUNT_ADDR + i, 0);
        writeArrayToEEPROM(HISTORY_ADDR + i * HISTORY_LENGTH, devicesData[i].history, sizeof(devicesData[i].history));
        server.send(200);
    }
    blinkStatusLed();
}

// Changes the running time limit for all the devices, validating the user input
void handleChangeLimit()
{
    String time_limit = server.arg("time_limit");
    char *end;
    long newTimeLimit = strtol(time_limit.c_str(), &end, 10);
    if (time_limit == "" || *end != '\0' || newTimeLimit > UINT16_MAX || newTimeLimit <= 0)
    {
        String response = formatError(INVALID_TIME_LIMIT, "Invalid time value");
        server.send(404, "application/json", response);
    }
    else
    {
        timeLimit = newTimeLimit;
        writeToEEPROM(LIMIT_ADDR, timeLimit);
        server.send(200);
    }
    blinkStatusLed();
}

// Resumes a given stopped device
void handleResume()
{
    String device = server.arg("device");
    char *end;
    long i = strtol(device.c_str(), &end, 10);
    if (device == "" || *end != '\0' || i > DEVICES_NUMBER - 1 || i < 0)
    {
        String response = formatError(INVALID_DEVICE, "Invalid device number");
        server.send(404, "application/json", response);
    }
    else if (devicesData[i].status != STOPPED)
    {
        String response = formatError(DEVICE_NOT_STOPPED, "The selected device is not in forced stop state");
        server.send(404, "application/json", response);
    }
    else
    {
        devicesData[i].status = OFF;
        server.send(200);
    }
    blinkStatusLed();
}

// Returns a not found message to the client, formatted as a JSON string
void handleNotFound()
{
    String response = formatError(NOT_FOUND, "URL not found");
    server.send(404, "application/json", response);
    blinkStatusLed();
}

// Set the status LED to blink, updating it's state variables
void blinkStatusLed()
{
    digitalWrite(STATUS_LED, HIGH);
    lastLedTimestamp = millis();
    isLedBlinking = true;
}
