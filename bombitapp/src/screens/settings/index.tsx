import React from 'react';
import {View, ScrollView} from 'react-native';

import {
  ConfigCard,
  RequestStatusIndicator,
  TimeLimitCard,
} from '../../components';
import {useModalContext} from '../../context';
import {useStore} from '../../state';
import {styles} from './styles';

/**
 * Device settings screen with some options to set device parameters.
 * @returns a screen component
 */
const SettingsScreen = () => {
  const modal = useModalContext();
  const currentStatus = useStore(state => state.status);
  const requestStatus = useStore(state => state.requestStatus);

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
      acceptCallback: value => {
        console.log(
          'The input with id ' + deviceId + ' will be renamed as ' + value,
        );
        modal.showInformationModal({
          text: 'El nombre de la entrada se modificó con éxito',
          type: 'SUCCESS',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the resuming of a stopped input. Shows wheter the API call was successful or not.
   * @param deviceId id of the input to resume
   */
  const resumeDevice = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Reanudar funcionamiento',
      text: 'La salida seleccionada va a reanudar su funcionamiento.',
      acceptCallback: () => {
        console.log(
          'The input with id ' + deviceId + ' will resume its operation',
        );
        modal.showInformationModal({
          text: 'El dispositivo reanudó su funcionamiento',
          type: 'SUCCESS',
        });
      },
    });
  };

  /**
   * Shows a modal sequence to confirm the record deletion of an input. Shows wheter the API call was successful or not.
   * @param deviceId id of the input whose records will be deleted
   */
  const deleteDeviceData = (deviceId: number) => {
    modal.showConfirmationModal({
      title: 'Borrar registros',
      text: 'Se van a borrar TODOS los registros, incluyendo historial, promedio y cantidad de arranques.',
      acceptCallback: () => {
        console.log(
          'The records for the input with id ' + deviceId + ' will be deleted',
        );
        modal.showInformationModal({
          text: 'Los registros de la entrada seleccionada fueron eliminados',
          type: 'SUCCESS',
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
      acceptCallback: value => {
        console.log(
          'The time limit for all inputs will be set to ' + value + ' minutes',
        );
        modal.showInformationModal({
          text: 'El dispositivo configuró el tiempo límite de funcionamiento correctamente',
          type: 'SUCCESS',
        });
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ConfigCard
        title="Entrada 1"
        renameDevice={() => renameDevice(0)}
        resumeDevice={() => resumeDevice(0)}
        deleteDeviceData={() => deleteDeviceData(0)}
        status={currentStatus?.outputs[0].status}
      />
      <ConfigCard
        title="Entrada 2"
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
