/* eslint-disable jsdoc/check-param-names */
import React, {useState} from 'react';
import {Modal, Text, TextInput, View, KeyboardTypeOptions} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import Colors from '../../constants/colors';
import {styles} from './styles';

type ConfirmationModalProps = {
  title: string;
  text: string;
  hideModal: () => void;
  acceptCallback: (value: string) => void;
  textInputConfig?: {
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    validation?: (value: string) => boolean;
  };
};

/**
 * Confirmation modal component, with a title, a text, and accept and cancel buttons.
 * @param props component props
 *   @param props.title modal title text
 *   @param props.text modal body text
 *   @param props.hideModal funcion to hide the modal
 *   @param props.acceptCallback funcion to be called when the accept button is pressed
 *   @param props.textInputConfig text input parameters
 *     @param props.textInputConfig.placeholder any additional props for the TextInput component
 *     @param props.textInputConfig.keyboardType any additional props for the TextInput component
 *     @param props.textInputConfig.validation function that takes the current input value as argument and return a boolean indicating if it's valid or not
 * @returns a modal component
 */
const ConfirmationModal = ({
  title,
  text,
  hideModal,
  acceptCallback,
  textInputConfig,
}: ConfirmationModalProps) => {
  const [inputText, onChangeInputText] = useState('');
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      onRequestClose={hideModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
          {textInputConfig && (
            <TextInput
              style={styles.input}
              onChangeText={onChangeInputText}
              value={inputText}
              placeholder={textInputConfig.placeholder}
              keyboardType={textInputConfig.keyboardType}
              placeholderTextColor={Colors.paragraph}
            />
          )}
          <View style={styles.buttonsContainer}>
            <ButtonWithIcon
              text={'Aceptar'}
              onPress={() => {
                acceptCallback(inputText);
                textInputConfig && onChangeInputText('');
                hideModal();
              }}
              disabled={
                textInputConfig?.validation &&
                !textInputConfig.validation(inputText)
              }
              customStyles={{text: styles.buttonText}}
            />
            <ButtonWithIcon
              text={'Cancelar'}
              onPress={() => {
                textInputConfig && onChangeInputText('');
                hideModal();
              }}
              customStyles={{text: styles.buttonText}}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
