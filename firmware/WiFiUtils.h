#ifndef WiFiUtils_h
#define WiFiUtils_h

#include "Arduino.h"

// Sets up an AP using the given credentials and calls awaitWiFiConnection().
void beginWiFi(String ssidAP, String passwordAP, int ledPin);

// Attempts to connect to a WiFi network using the given credentials, blinking the given LED while trying. If, after 15 seconds the connection is not established, it stops trying.
void connectToWiFi(String ssid, String password, int ledPin);

// Checks if the WiFi connection is established and returns a boolean indicating it.
bool isWiFiConnected();

#endif
