/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Text} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type ConfigCardProps = {
  title: string | undefined;
  deviceId: number | undefined;
  renameDevice: (deviceId: number, name: string) => void;
  resumeDevice: (deviceId: number) => void;
  deleteDeviceData: (deviceId: number) => void;
  status: 'OFF' | 'STARTING' | 'WORKING' | 'STOPPED' | undefined;
};

/**
 * Device configuration card, that displays buttons to configure the device.
 * @param props component props
 *   @param props.title card title
 *   @param props.deviceId id of the device displayed in this card
 *   @param props.renameDevice funcion to be called when the rename button is pressed, taking the new name and the device id as parameters
 *   @param props.resumeDevice funcion to be called when the resume button is pressed, taking the device id as a parameter
 *   @param props.deleteDeviceData funcion to be called when the delete button is pressed, taking the device id as a parameter
 *   @param props.status current device status
 * @returns a card component
 */
const ConfigCard = ({
  title,
  deviceId,
  renameDevice,
  resumeDevice,
  deleteDeviceData,
  status,
}: ConfigCardProps) => {
  const statusStyles = {
    OFF: styles.statusOff,
    STARTING: styles.statusOn,
    WORKING: styles.statusOn,
    STOPPED: styles.statusStop,
  };

  return (
    <View style={[styles.container, status && statusStyles[status]]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <ButtonWithIcon
          customStyles={styles.button}
          iconConfig={{name: 'pen'}}
          text="Renombrar"
          onPress={() => {}}
        />
        <ButtonWithIcon
          customStyles={styles.button}
          iconConfig={{name: 'arrow-up-circle'}}
          text="Reanudar"
          onPress={() => {}}
          disabled={status !== 'STOPPED'}
        />
        <ButtonWithIcon
          customStyles={styles.button}
          iconConfig={{name: 'trash-can'}}
          text="Borrar"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default ConfigCard;
