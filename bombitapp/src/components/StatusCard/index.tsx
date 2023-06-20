import React from 'react';
import {Text, View} from 'react-native';

import {DeviceStatuses, parseTime} from '../../helpers';
import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type StatusCardProps = {
  name: string | undefined;
  currentTime: number | undefined;
  meanTime: number | undefined;
  runs: number | undefined;
  status: DeviceStatuses | undefined;
  historyOnPress: () => void;
};

/**
 * Device status card, that displays the main device information and the timers.
 * @param props component props
 *   @param props.name device name
 *   @param props.currentTime curent time value
 *   @param props.meanTime mean time value
 *   @param props.runs total run count
 *   @param props.status current device status
 *   @param props.historyOnPress funcion to be called when the history button is pressed
 * @returns a card component
 */
const StatusCard = ({
  name,
  currentTime,
  meanTime,
  runs,
  status,
  historyOnPress,
}: StatusCardProps): JSX.Element => {
  const statusStyles = [
    styles.statusOff,
    styles.statusOn,
    styles.statusOn,
    styles.statusStop,
  ];

  return (
    <View
      style={[styles.container, status !== undefined && statusStyles[status]]}>
      <View>
        <Text style={styles.name}>{name ?? '-'}</Text>
        <Text style={styles.time}>
          {currentTime !== undefined ? parseTime(currentTime) : '-'}
        </Text>
        <View style={styles.recordsContainer}>
          <View>
            <Text style={styles.recordTitle}>Promedio</Text>
            <Text style={styles.recordValue}>{meanTime ?? '-'}</Text>
          </View>
          <View>
            <Text style={styles.recordTitle}>Arranques</Text>
            <Text style={styles.recordValue}>{runs ?? '-'}</Text>
          </View>
        </View>
      </View>
      <View>
        <ButtonWithIcon
          text={'Historial'}
          iconConfig={{name: 'progress-clock'}}
          onPress={historyOnPress}
          customStyles={{container: styles.button}}
        />
      </View>
    </View>
  );
};

export default StatusCard;
