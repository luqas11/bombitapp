import React from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ConfigCard,
  IPConfigCard,
  RequestStatusIndicator,
  TimeLimitCard,
} from '../../components';
import {useModalContext} from '../../context';
import {useStore} from '../../state';
import {changeTimeLimit, clearHistory, resume, setBaseURL} from '../../helpers';
import {DEVICE_IP_STORAGE_KEY, DEVICE_NAME_PREFIX} from '../../constants';
import {styles} from './styles';

/**
 * Device settings screen with some options to set devices parameters.
 * @returns a screen component
 */
const SettingsScreen = () => {
  const modal = useModalContext();
  const currentStatus = useStore(state => state.status);
  const requestStatus = useStore(state => state.requestStatus);
  const devicesNames = useStore(state => state.names);
  const deviceIP = useStore(state => state.ip);
  const setDeviceIP = useStore(state => state.setDeviceIP);
  const setDeviceName = useStore(state => state.setDeviceName);

  /**
   * Shows a modal sequence to set and confirm a device renaming. Shows whether the storage process was successful or not.
   * @param deviceId id of the device to rename
   */
  const renameDevice = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Renombrar dispositivo',
      text: 'Ingresá el nombre con el que se va a mostrar esta dispositivo.',
      textInputConfig: {
        placeholder: 'Nombre del dispositivo',
        validation: value => Boolean(value),
      },
      acceptCallback: async value => {
        await AsyncStorage.setItem(DEVICE_NAME_PREFIX + deviceId, value);
        setDeviceName(value, deviceId);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'El nombre del dispositivo se modificó con éxito.',
          type: 'SUCCESS',
        });
      },
      errorCallback: () => {
        modal.showInformationModal({
          text: 'La app no pudo modificar el nombre del dispositivo.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the resuming of a stopped device. Shows whether the API call was successful or not.
   * @param deviceId id of the device to resume
   */
  const resumeDevice = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Reanudar funcionamiento',
      text: 'El dispositivo seleccionado va a reanudar su funcionamiento.',
      acceptCallback: async () => {
        await resume(deviceId);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'El dispositivo reanudó su funcionamiento.',
          type: 'SUCCESS',
        });
      },
      errorCallback: error => {
        modal.showInformationModal({
          text: error?.error_code
            ? 'El dispositivo no pudo reanudar su funcionamiento.'
            : 'La app no pudo conectarse al sistema.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the record and history deletion of a device. Shows whether the API call was successful or not.
   * @param deviceId id of the device whose records and history will be deleted
   */
  const deleteDeviceData = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Borrar registros',
      text: 'Se van a borrar TODOS los registros del dispositivo seleccionado, incluyendo historial, promedio y cantidad de arranques.',
      acceptCallback: async () => {
        await clearHistory(deviceId);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'Los registros del dispositivo seleccionado fueron eliminados.',
          type: 'SUCCESS',
        });
      },
      errorCallback: error => {
        modal.showInformationModal({
          text: error?.error_code
            ? 'El sistema no pudo borrar los registros del dispositivo seleccionado.'
            : 'La app no pudo conectarse al sistema.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to set and confirm the device running time limit. Shows whether the API call was successful or not.
   */
  const setDeviceTimeLimit = () => {
    modal.showConfirmationModal({
      title: 'Modificar tiempo límite',
      text: 'Ingresá el tiempo límite (en minutos) hasta el que van a funcionar los dispositivos hasta aplicar el corte automático.',
      textInputConfig: {
        placeholder: 'Tiempo límite',
        keyboardType: 'numeric',
        validation: value => parseInt(value, 10) > 0,
      },
      acceptCallback: async value => {
        await changeTimeLimit(value);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'El sistema configuró el tiempo límite de funcionamiento correctamente.',
          type: 'SUCCESS',
        });
      },
      errorCallback: error => {
        modal.showInformationModal({
          text: error?.error_code
            ? 'El sistema no pudo configurar el tiempo límite de funcionamiento.'
            : 'La app no pudo conectarse al sistema.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to set and confirm the device IP address. Shows whether the storage process was successful or not.
   */
  const setDeviceIPAddress = () => {
    modal.showConfirmationModal({
      title: 'Cambiar dirección IP',
      text: 'Ingresá la dirección IP a la que se va a conectar la app.',
      textInputConfig: {
        placeholder: 'IP del dispositivo',
        validation: value => Boolean(value),
        initialValue: deviceIP,
      },
      acceptCallback: async value => {
        await AsyncStorage.setItem(DEVICE_IP_STORAGE_KEY, value);
        setBaseURL(value);
        setDeviceIP(value);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'La IP del dispositivo se modificó con éxito.',
          type: 'SUCCESS',
        });
      },
      errorCallback: () => {
        modal.showInformationModal({
          text: 'La app no pudo modificar la IP del dispositivo.',
          type: 'ERROR',
        });
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConfigCard
        title={devicesNames?.[0]}
        renameDevice={() => renameDevice(0)}
        resumeDevice={() => resumeDevice(0)}
        deleteDeviceData={() => deleteDeviceData(0)}
        status={currentStatus?.devices[0].status}
      />
      <ConfigCard
        title={devicesNames?.[1]}
        renameDevice={() => renameDevice(1)}
        resumeDevice={() => resumeDevice(1)}
        deleteDeviceData={() => deleteDeviceData(1)}
        status={currentStatus?.devices[1].status}
      />
      <TimeLimitCard
        setDeviceTimeLimit={setDeviceTimeLimit}
        timeLimit={currentStatus?.time_limit}
      />
      <IPConfigCard setDeviceIPAddress={setDeviceIPAddress} ip={deviceIP} />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState={requestStatus} />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
