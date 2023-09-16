#include <ArduinoJson.h>
#include "DataTypes.h"
#include "JSONUtils.h"

String formatError(String errorCode, String errorMessage)
{
    String output;
    StaticJsonDocument<128> doc;

    doc["error_code"] = errorCode;
    doc["error_message"] = errorMessage;

    serializeJson(doc, output);
    return output;
}

String formatStatus(uint16_t timeLimit, OutputData outputsData[], int outputsNumber)
{
    StaticJsonDocument<768> doc;
    doc["time_limit"] = timeLimit;
    JsonArray outputs = doc.createNestedArray("outputs");

    for (int i = 0; i < outputsNumber; i++)
    {
        JsonObject output = outputs.createNestedObject();
        output["status"] = outputsData[i].status;
        output["current_time"] = outputsData[i].currentTime;
        output["mean_time"] = outputsData[i].meanTime;
        output["run_count"] = outputsData[i].runCount;
        output["sensor_status"] = outputsData[i].sensorStatus;

        JsonArray output_history = output.createNestedArray("history");
        for (int j = 0; j < sizeof(outputsData[i].history) / sizeof(uint16_t); j++)
        {
            output_history.add(outputsData[i].history[j]);
        }
    }

    String outputString;
    serializeJson(doc, outputString);
    return outputString;
}
