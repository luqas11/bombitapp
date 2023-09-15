#include <ESP8266WebServer.h>
#include "WiFiUtils.h"
#include "EEPROMUtils.h"
#include "config.h"

/*
   Version 5.0.0
   13-9-2023
*/

// LED pin to indicate the network connection status
const int WIFI_STATUS_LED = 2;

// HTTP server instance
ESP8266WebServer server(80);

void setup()
{
    Serial.begin(115200);
    pinMode(WIFI_STATUS_LED, OUTPUT);

    beginEEPROM();
    connectToWifi(SSID, PASSWORD, IP, GATEWAY, SUBNET, WIFI_STATUS_LED);

    server.on("/status", handleStatus);
    server.on("/clear-history", handleClear);
    server.on("/change-time-limit", handleChangeLimit);
    server.on("/resume-output", handleResume);
    server.onNotFound(handleNotFound);

    server.begin();
}

void loop()
{
    server.handleClient();
}

void handleStatus()
{
    server.send(200, "text/plain", "Device status");
}

void handleClear()
{
    String input = server.arg("input");
    server.send(200, "text/plain", "Clear device " + input + " history");
}

void handleChangeLimit()
{
    String timeLimit = server.arg("time_limit");
    server.send(200, "text/plain", "Change time limit to " + timeLimit);
}

void handleResume()
{
    String output = server.arg("output");
    server.send(200, "text/plain", "Resume stopped device " + output);
}

void handleNotFound()
{
    server.send(404, "text/plain", "Not found");
}
