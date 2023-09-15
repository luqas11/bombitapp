#ifndef WiFiUtils_h
#define WiFiUtils_h

#include "Arduino.h"

// Attempts to connect the device to a WiFi network with the given values. Retries indefinitely until a connection is successfully established. Blinks a given LED while trying, and turns it on if success.
void connectToWifi(String ssid, String password, String ip, String gateway, String subnet, int ledPin);

#endif
