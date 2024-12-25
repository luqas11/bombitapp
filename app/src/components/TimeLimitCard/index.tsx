import React from 'react';
import {Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type TimeLimitCardProps = {
  setDeviceTimeLimit: () => void;
  timeLimit: number | undefined;
};

/**
 * Device time limit configuration card that displays the current time limit value and a button to change it.
 * @param props component props
 *   @param props.setDeviceTimeLimit funcion to be called when the set time limit button is pressed
 *   @param props.timeLimit current time limit value on the device
 * @returns a card component
 */
const TimeLimitCard = ({setDeviceTimeLimit, timeLimit}: TimeLimitCardProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{'Tiempo límite: '}</Text>
        <Text style={styles.value}>
          {timeLimit !== undefined ? timeLimit + ' min' : '-'}
        </Text>
      </View>
      <ButtonWithIcon
        customStyles={{container: styles.button}}
        iconConfig={{name: 'clock-edit'}}
        text="Modificar"
        onPress={setDeviceTimeLimit}
      />
    </View>
  );
};

export default TimeLimitCard;
