#ifndef WiFiUtils_h
#define WiFiUtils_h

// Attempts to connect the system to a WiFi network with the given credentials. Retries indefinitely until a connection is successfully established. Blinks a given LED while trying, and turns it on if success.
void connectToWifi(String ssid, String password, int ledPin);

// Checks if the WiFi connection is established and returns a boolean indicating it.
bool isWiFiConnected();

#endif
