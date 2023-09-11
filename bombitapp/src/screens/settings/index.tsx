import React from 'react';
import {View, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ConfigCard,
  RequestStatusIndicator,
  TimeLimitCard,
} from '../../components';
import {useModalContext} from '../../context';
import {useStore} from '../../state';
import {changeTimeLimit, clearHistory, resumeOutput} from '../../helpers';
import {DEVICE_NAME_PREFIX} from '../../constants';
import {styles} from './styles';

/**
 * Device settings screen with some options to set device parameters.
 * @returns a screen component
 */
const SettingsScreen = () => {
  const modal = useModalContext();
  const currentStatus = useStore(state => state.status);
  const requestStatus = useStore(state => state.requestStatus);
  const devicesNames = useStore(state => state.names);
  const setDeviceName = useStore(state => state.setDeviceName);

  /**
   * Shows a modal sequence to set and confirm an input renaming. Shows wheter the API call was successful or not.
   * @param deviceId id of the input to rename
   */
  const renameDevice = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Renombrar dispositivo',
      text: 'Ingresá el nombre con el que se va a mostrar esta entrada.',
      textInputConfig: {
        placeholder: 'Nombre de la entrada',
        validation: value => Boolean(value),
      },
      acceptCallback: async value => {
        await AsyncStorage.setItem(DEVICE_NAME_PREFIX + deviceId, value);
        setDeviceName(value, deviceId);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'El nombre de la entrada se modificó con éxito.',
          type: 'SUCCESS',
        });
      },
      errorCallback: () => {
        modal.showInformationModal({
          text: 'La app no pudo modificar el nombre de la entrada.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the resuming of a stopped input. Shows whether the API call was successful or not.
   * @param deviceId id of the input to resume
   */
  const resumeDevice = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Reanudar funcionamiento',
      text: 'La salida seleccionada va a reanudar su funcionamiento.',
      acceptCallback: async () => {
        await resumeOutput(deviceId);
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
            : 'La app no pudo conectarse al dispositivo.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the record deletion of an input. Shows whether the API call was successful or not.
   * @param deviceId id of the input whose records will be deleted
   */
  const deleteDeviceData = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Borrar registros',
      text: 'Se van a borrar TODOS los registros, incluyendo historial, promedio y cantidad de arranques.',
      acceptCallback: async () => {
        await clearHistory(deviceId);
      },
      successCallback: () => {
        modal.showInformationModal({
          text: 'Los registros de la entrada seleccionada fueron eliminados.',
          type: 'SUCCESS',
        });
      },
      errorCallback: error => {
        modal.showInformationModal({
          text: error?.error_code
            ? 'El dispositivo no pudo borrar los registros de la entrada seleccionada.'
            : 'La app no pudo conectarse al dispositivo.',
          type: 'ERROR',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to set and confirm the inputs working time limit. Shows wheter the API call was successful or not.
   */
  const setDeviceTimeLimit = () => {
    modal.showConfirmationModal({
      title: 'Modificar tiempo límite',
      text: 'Ingresá el tiempo límite (en minutos) hasta el que van a funcionar las entradas hasta aplicar el corte automático.',
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
          text: 'El dispositivo configuró el tiempo límite de funcionamiento correctamente.',
          type: 'SUCCESS',
        });
      },
      errorCallback: error => {
        modal.showInformationModal({
          text: error?.error_code
            ? 'El dispositivo no pudo configurar el tiempo límite de funcionamiento.'
            : 'La app no pudo conectarse al dispositivo.',
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
        status={currentStatus?.outputs[0].status}
      />
      <ConfigCard
        title={devicesNames?.[1]}
        renameDevice={() => renameDevice(1)}
        resumeDevice={() => resumeDevice(1)}
        deleteDeviceData={() => deleteDeviceData(1)}
        status={currentStatus?.outputs[1].status}
      />
      <TimeLimitCard
        setDeviceTimeLimit={setDeviceTimeLimit}
        timeLimit={currentStatus?.time_limit}
      />
      <View style={styles.indicatorContainer}>
        <RequestStatusIndicator requestState={requestStatus} />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
