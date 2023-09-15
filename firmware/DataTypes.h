#ifndef DataTypes_h
#define DataTypes_h

#include "Arduino.h"

// Structure able to hold all the outputs information that is relevant to the client.
struct Output
{
    uint8_t status;
    uint16_t currentTime;
    uint16_t meanTime;
    uint16_t runCount;
    bool sensorStatus;
    uint16_t history[10];
};

#endif
