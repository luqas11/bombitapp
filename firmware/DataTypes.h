#ifndef DataTypes_h
#define DataTypes_h

#include "Arduino.h"

// Structure that holds the data related to an output.
struct OutputData
{
    uint8_t status;
    uint16_t currentTime;
    uint16_t meanTime;
    uint16_t runCount;
    bool sensorStatus;
    uint16_t history[10];
    unsigned long currentRunTimestamp;
    unsigned long lastChangeTimestamp;
    bool lastChange;
};

#endif
