import React from 'react';
import {View} from 'react-native';

import {RequestStatusIndicator, StatusCard} from '../../components';
import {styles} from './styles';

/**
 * Main dashboard screen, that displays all device information and status.
 * @returns a screen component
 */
const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <StatusCard
        name={'Entrada 1'}
        currentTime={0}
        meanTime={0}
        runs={0}
        status={'OFF'}
        historyOnPress={() => {}}
      />
      <StatusCard
        name={'Entrada 2'}
        currentTime={0}
        meanTime={0}
        runs={0}
        status={'OFF'}
        historyOnPress={() => {}}
      />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState="IN_PROGRESS" />
      </View>
    </View>
  );
};

export default DashboardScreen;
