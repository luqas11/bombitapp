/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type TimeLimitCardProps = {
  setDeviceTimeLimit: (time: number) => void;
  timeLimit: number | undefined;
};

/**
 * Device time limit configuration card that displays the current time limit value and a button to change it.
 * @param props component props
 *   @param props.setDeviceTimeLimit funcion to be called when the set time limit button is pressed, taking the new selected time limis as a parameter
 *   @param props.timeLimit current time limit value on the device
 * @returns a card component
 */
const TimeLimitCard = ({setDeviceTimeLimit, timeLimit}: TimeLimitCardProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{'Tiempo límite: '}</Text>
        <Text style={styles.value}>
          {timeLimit !== undefined ? Math.round(timeLimit / 60) + ' min' : '-'}
        </Text>
      </View>
      <ButtonWithIcon
        customStyles={styles.button}
        iconConfig={{name: 'clock-edit'}}
        text="Modificar"
        onPress={() => {}}
      />
    </View>
  );
};

export default TimeLimitCard;
