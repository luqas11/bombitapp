import React from 'react';
import {Modal, Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {styles} from './styles';

type InformationModalProps = {
  text: string;
  visible: boolean;
  hideModal: () => void;
  type: 'ERROR' | 'SUCCESS' | undefined;
};

/**
 * Information modal component, with a title, a text, and an accept button.
 * @param props component props
 *   @param props.text modal body text
 *   @param props.visible boolean indicating whether the modal is visible or hidden
 *   @param props.hideModal funcion to hide the modal
 *   @param props.type defines the type of message displayed in the modal (error or success)
 * @returns a modal component
 */
const InformationModal = ({
  text,
  visible,
  hideModal,
  type,
}: InformationModalProps) => {
  const messageTypeStyles = {
    ERROR: styles.messageError,
    SUCCESS: styles.messageSuccess,
  };

  return (
    <Modal
      animationType={'slide'}
      visible={visible}
      transparent={true}
      onRequestClose={hideModal}>
      <View style={styles.container}>
        <View style={[styles.modalContainer, type && messageTypeStyles[type]]}>
          <Text style={styles.text}>{text}</Text>
          <ButtonWithIcon
            text="Aceptar"
            onPress={hideModal}
            customStyles={{text: styles.buttonText}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default InformationModal;
