#ifndef JSONUtils_h
#define JSONUtils_h

#include "Arduino.h"
#include "DataTypes.h"

/*
    Creates a JSON string with an error code and an error message values.
*/
String formatError(String error_code, String error_message);

/*
    Creates a JSON string with the given outputs values.
*/
String formatStatus(uint16_t timeLimit, Output outputData[], uint8_t outputsNumber);

#endif
