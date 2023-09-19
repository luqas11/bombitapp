import React from 'react';
import {View, Text} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {DeviceStatuses} from '../../helpers';
import {styles} from './styles';

type ConfigCardProps = {
  title: string | undefined;
  renameDevice: () => void;
  resumeDevice: () => void;
  deleteDeviceData: () => void;
  status: DeviceStatuses | undefined;
};

/**
 * Device configuration card, that displays buttons to configure the device.
 * @param props component props
 *   @param props.title card title
 *   @param props.renameDevice funcion to be called when the rename button is pressed
 *   @param props.resumeDevice funcion to be called when the resume button is pressed
 *   @param props.deleteDeviceData funcion to be called when the delete button is pressed
 *   @param props.status current device status
 * @returns a card component
 */
const ConfigCard = ({
  title,
  renameDevice,
  resumeDevice,
  deleteDeviceData,
  status,
}: ConfigCardProps) => {
  const statusStyles = [
    styles.statusOff,
    styles.statusOn,
    styles.statusStopped,
  ];

  return (
    <View
      style={[styles.container, status !== undefined && statusStyles[status]]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonsContainer}>
        <ButtonWithIcon
          customStyles={{container: styles.button}}
          iconConfig={{name: 'pen', size: 40}}
          text="Renombrar"
          onPress={renameDevice}
        />
        <ButtonWithIcon
          customStyles={{container: styles.button}}
          iconConfig={{name: 'arrow-up-circle', size: 40}}
          text="Reanudar"
          onPress={resumeDevice}
          disabled={status !== 2}
        />
        <ButtonWithIcon
          customStyles={{container: styles.button}}
          iconConfig={{name: 'trash-can', size: 40}}
          text="Borrar"
          onPress={deleteDeviceData}
        />
      </View>
    </View>
  );
};

export default ConfigCard;
