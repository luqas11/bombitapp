import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  ConfigCard,
  RequestStatusIndicator,
  TimeLimitCard,
} from '../../components';
import {styles} from './styles';

/**
 * Device settings screen with some options to set device parameters.
 * @returns a screen component
 */
const SettingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConfigCard
        title="Entrada 1"
        deviceId={0}
        renameDevice={() => {}}
        resumeDevice={() => {}}
        deleteDeviceData={() => {}}
        status="OFF"
      />
      <ConfigCard
        title="Entrada 2"
        deviceId={1}
        renameDevice={() => {}}
        resumeDevice={() => {}}
        deleteDeviceData={() => {}}
        status="OFF"
      />
      <TimeLimitCard setDeviceTimeLimit={() => {}} timeLimit={3600} />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState="IN_PROGRESS" />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
