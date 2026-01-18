#include <ESP8266WiFi.h>
#include "WiFiUtils.h"

const int MAX_AWAIT_TIME = 15;

bool isWiFiConnected() {
  return WiFi.status() == WL_CONNECTED;
}

void awaitWiFiConnection(int ledPin) {
  Serial.println("Connecting to WiFi");
  for (int i = 0; i < MAX_AWAIT_TIME; i++) {
    if (isWiFiConnected()) {
      break;
    }
    digitalWrite(ledPin, LOW);
    delay(500);
    Serial.print(".");
    digitalWrite(ledPin, HIGH);
    delay(500);
  }
  Serial.println();

  if (isWiFiConnected()) {
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("WiFi connection failed");
  }
}

void connectToWiFi(String ssid, String password, int ledPin) {
  WiFi.begin(ssid, password);
  awaitWiFiConnection(ledPin);
}

void connectToWiFi(int ledPin) {
  WiFi.begin();
  awaitWiFiConnection(ledPin);
}

void beginWiFi(String ssidAP, String passwordAP, int ledPin) {
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP(ssidAP, passwordAP);
  WiFi.persistent(true);
  connectToWiFi(ledPin);
}
