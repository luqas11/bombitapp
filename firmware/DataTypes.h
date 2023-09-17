#ifndef DataTypes_h
#define DataTypes_h

#include "Arduino.h"

// Length of the run time history array
const int HISTORY_LENGTH = 10;
// Structure that holds the data related to an output.
struct OutputData
{
    uint8_t status;
    uint16_t currentTime;
    uint16_t meanTime;
    uint16_t runCount;
    bool sensorStatus;
    uint16_t history[HISTORY_LENGTH];
    unsigned long currentRunTimestamp;
    unsigned long lastChangeTimestamp;
    bool lastChange;
};

#endif
