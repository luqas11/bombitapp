import React from 'react';
import {View} from 'react-native';

import {RequestStatusIndicator, StatusCard} from '../../components';
import {useModalContext} from '../../context';
import {styles} from './styles';

/**
 * Main dashboard screen, that displays all device information and status.
 * @returns a screen component
 */
const DashboardScreen = () => {
  const modal = useModalContext();

  const historyDummyData1 = [] as number[];
  const historyDummyData2 = [23, 0, 5, 213, 0, 2435, 23, 123];

  return (
    <View style={styles.container}>
      <StatusCard
        name={'Entrada 1'}
        currentTime={0}
        meanTime={0}
        runs={0}
        status={'OFF'}
        historyOnPress={() =>
          modal.showHistoryModal({entries: historyDummyData1})
        }
      />
      <StatusCard
        name={'Entrada 2'}
        currentTime={0}
        meanTime={0}
        runs={0}
        status={'OFF'}
        historyOnPress={() =>
          modal.showHistoryModal({entries: historyDummyData2})
        }
      />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState="IN_PROGRESS" />
      </View>
    </View>
  );
};

export default DashboardScreen;
