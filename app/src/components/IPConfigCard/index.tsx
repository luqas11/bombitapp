import React from 'react';
import {Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type IPConfigCardProps = {
  setDeviceIPAddress: () => void;
  ip: string | undefined;
};

/**
 * Device IP address configuration card that displays the currently set IP value and a button to change it.
 * @param props component props
 *   @param props.setDeviceIPAddress funcion to be called when the set modify IP address button is pressed
 *   @param props.ip currently set IP address
 * @returns a card component
 */
const IPConfigCard = ({setDeviceIPAddress, ip}: IPConfigCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.texts}>
        <Text style={styles.title}>{'IP del dispositivo: '}</Text>
        <Text style={styles.value} numberOfLines={1}>
          {ip ?? '-'}
        </Text>
      </View>
      <ButtonWithIcon
        customStyles={{container: styles.button}}
        iconConfig={{name: 'pen', size: 40}}
        text="Modificar"
        onPress={setDeviceIPAddress}
      />
    </View>
  );
};

export default IPConfigCard;
