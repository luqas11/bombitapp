#include <ESP8266WiFi.h>
#include "WiFiUtils.h"

bool isWiFiConnected()
{
    return WiFi.status() == WL_CONNECTED;
}

void connectToWifi(String ssid, String password, String ip, String gateway, String subnet, int ledPin)
{
    IPAddress _ip;
    _ip.fromString(ip);
    IPAddress _gateway;
    _gateway.fromString(gateway);
    IPAddress _subnet;
    _subnet.fromString(subnet);

    Serial.print("Connecting to ");
    Serial.println(String(ssid));
    WiFi.mode(WIFI_STA);
    WiFi.config(_ip, _gateway, _subnet);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        digitalWrite(ledPin, LOW);
        delay(250);
        Serial.print(".");
        digitalWrite(ledPin, HIGH);
        delay(250);
    }
    digitalWrite(ledPin, LOW);

    Serial.println();
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}