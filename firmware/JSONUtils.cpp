#include <ArduinoJson.h>
#include "DataTypes.h"
#include "JSONUtils.h"

String formatError(String errorCode, String errorMessage) {
  String response;
  StaticJsonDocument<128> doc;

  doc["error_code"] = errorCode;
  doc["error_message"] = errorMessage;

  serializeJson(doc, response);
  return response;
}

String formatWiFiConfig(String ssid) {
  String response;
  StaticJsonDocument<128> doc;

  doc["ssid"] = ssid;

  serializeJson(doc, response);
  return response;
}

String formatWiFiStatus(String ip, int status) {
  String response;
  StaticJsonDocument<128> doc;

  doc["status"] = status;
  doc["ip"] = ip;

  serializeJson(doc, response);
  return response;
}

String formatStatus(uint16_t timeLimit, DeviceData devicesData[], int devicesNumber) {
  StaticJsonDocument<768> doc;
  doc["time_limit"] = timeLimit;
  JsonArray devices = doc.createNestedArray("devices");

  for (int i = 0; i < devicesNumber; i++) {
    JsonObject device = devices.createNestedObject();
    device["status"] = devicesData[i].status;
    device["current_time"] = devicesData[i].currentTime;
    device["mean_time"] = devicesData[i].meanTime;
    device["run_count"] = devicesData[i].runCount;
    device["input_status"] = devicesData[i].inputStatus;

    JsonArray device_history = device.createNestedArray("history");
    for (int j = 0; j < sizeof(devicesData[i].history) / sizeof(uint16_t); j++) {
      device_history.add(devicesData[i].history[j]);
    }
  }

  String response;
  serializeJson(doc, response);
  return response;
}
