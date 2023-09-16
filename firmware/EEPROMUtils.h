#ifndef EEPROMUtils_h
#define EEPROMUtils_h

#include "Arduino.h"

// Initializes the EEPROM library.
void beginEEPROM();

// Writes a uint16_t value to the EEPROM at the specified address.
void writeToEEPROM(int index, uint16_t value);

// Writes a uint16_t array to the EEPROM, starting at the specified address and ending after the given size has been written.
void writeArrayToEEPROM(int index, uint16_t array[], int size);

// Reads a uint16_t value from the EEPROM at the specified address.
uint16_t readFromEEPROM(int index);

// Reads a uint16_t array from the EEPROM, starting at the specified address and ending after the given size has been read.
void readArrayFromEEPROM(int index, uint16_t array[], int size);

#endif
