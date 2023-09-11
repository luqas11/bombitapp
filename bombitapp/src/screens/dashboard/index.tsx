import React from 'react';
import {View} from 'react-native';

import {RequestStatusIndicator, StatusCard} from '../../components';
import {useModalContext} from '../../context';
import {useStore} from '../../state';
import {styles} from './styles';

/**
 * Main dashboard screen, that displays all device information and status.
 * @returns a screen component
 */
const DashboardScreen = () => {
  const modal = useModalContext();
  const currentStatus = useStore(state => state.status);
  const requestStatus = useStore(state => state.requestStatus);
  const devicesNames = useStore(state => state.names);

  return (
    <View style={styles.container}>
      <StatusCard
        name={devicesNames?.[0]}
        currentTime={currentStatus?.outputs[0].current_time}
        meanTime={currentStatus?.outputs[0].mean_time}
        runs={currentStatus?.outputs[0].run_count}
        status={currentStatus?.outputs[0].status}
        sensorStatus={currentStatus?.outputs[0].sensor_status}
        historyOnPress={() =>
          modal.showHistoryModal({entries: currentStatus?.outputs[0].history})
        }
      />
      <StatusCard
        name={devicesNames?.[1]}
        currentTime={currentStatus?.outputs[1].current_time}
        meanTime={currentStatus?.outputs[1].mean_time}
        runs={currentStatus?.outputs[1].run_count}
        status={currentStatus?.outputs[1].status}
        sensorStatus={currentStatus?.outputs[1].sensor_status}
        historyOnPress={() =>
          modal.showHistoryModal({entries: currentStatus?.outputs[1].history})
        }
      />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState={requestStatus} />
      </View>
    </View>
  );
};

export default DashboardScreen;
