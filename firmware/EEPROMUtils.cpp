#include "EEPROMUtils.h"
#include <EEPROM.h>

void beginEEPROM() {
  EEPROM.begin(512);
}

uint16_t readFromEEPROM(int index) {
  int _index = index * sizeof(uint16_t);
  uint16_t value;
  EEPROM.get(_index, value);
  return value;
}

void readArrayFromEEPROM(int index, uint16_t array[], int size) {
  for (int i = 0; i < (size / sizeof(uint16_t)); i++) {
    array[i] = readFromEEPROM(index + i);
  }
}

void _writeToEEPROM(int index, uint16_t value) {
  int _index = index * sizeof(uint16_t);
  EEPROM.put(_index, value);
}

void writeToEEPROM(int index, uint16_t value) {
  _writeToEEPROM(index, value);
  EEPROM.commit();
}

void writeArrayToEEPROM(int index, uint16_t array[], int size) {
  for (int i = 0; i < size / sizeof(uint16_t); i++) {
    _writeToEEPROM(index + i, array[i]);
  }
  EEPROM.commit();
}
