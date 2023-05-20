import React from 'react';
import {Text, View} from 'react-native';

import {parseTime} from '../../helpers';
import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type StatusCardProps = {
  name: string | undefined;
  currentTime: number | undefined;
  meanTime: number | undefined;
  runs: number | undefined;
  status: 'OFF' | 'STARTING' | 'WORKING' | 'STOPPED' | undefined;
  historyOnPress: () => void;
};

const StatusCard = ({
  name,
  currentTime,
  meanTime,
  runs,
  status,
  historyOnPress,
}: StatusCardProps): JSX.Element => {
  const statusStyles = {
    OFF: styles.statusOff,
    STARTING: styles.statusOn,
    WORKING: styles.statusOn,
    STOPPED: styles.statusStop,
  };

  return (
    <View style={[styles.container, status && statusStyles[status]]}>
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
          customStyles={styles.button}
        />
      </View>
    </View>
  );
};

export default StatusCard;
