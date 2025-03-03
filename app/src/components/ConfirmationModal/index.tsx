/* eslint-disable jsdoc/check-param-names */
import React, {useState} from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import ButtonWithIcon from '../ButtonWithIcon';
import Colors from '../../constants/colors';
import {ErrorResponse} from '../../helpers';
import {styles} from './styles';

type ConfirmationModalProps = {
  title: string;
  text: string;
  hideModal: () => void;
  acceptCallback: (value: string) => Promise<void>;
  successCallback: () => void;
  errorCallback: (error?: ErrorResponse) => void;
  textInputConfig?: {
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    validation?: (value: string) => boolean;
    initialValue?: string;
  };
};

/**
 * Confirmation modal component, with a title, a text, and accept and cancel buttons.
 * @param props component props
 *   @param props.title modal title text
 *   @param props.text modal body text
 *   @param props.hideModal funcion to hide the modal
 *   @param props.acceptCallback funcion to be called when the accept button is pressed
 *   @param props.successCallback function to be called when the acceptCallback is successfully executed
 *   @param props.errorCallback function to be called when the acceptCallback throws an error
 *   @param props.textInputConfig text input parameters
 *     @param props.textInputConfig.placeholder placeholder text to show when there is no text written
 *     @param props.textInputConfig.keyboardType keyboard type to be displayed while writing
 *     @param props.textInputConfig.validation function that takes the current input value as argument and return a boolean indicating if it's valid or not
 *     @param props.textInputConfig.initialValue initial input text content
 * @returns a modal component
 */
const ConfirmationModal = ({
  title,
  text,
  hideModal,
  acceptCallback,
  successCallback,
  errorCallback,
  textInputConfig,
}: ConfirmationModalProps) => {
  const [inputText, setInputText] = useState(
    textInputConfig?.initialValue ?? '',
  );
  const [isLoading, setLoading] = useState(false);
  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      onRequestClose={isLoading ? undefined : hideModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
          {textInputConfig && (
            <TextInput
              style={styles.input}
              onChangeText={setInputText}
              value={inputText}
              placeholder={textInputConfig.placeholder}
              keyboardType={textInputConfig.keyboardType}
              placeholderTextColor={Colors.paragraph}
            />
          )}
          {isLoading ? (
            <ActivityIndicator size={50} color="#00FFFF" />
          ) : (
            <View style={styles.buttonsContainer}>
              <ButtonWithIcon
                text={'Aceptar'}
                onPress={async () => {
                  try {
                    setLoading(true);
                    await acceptCallback(inputText);
                    successCallback();
                  } catch (error) {
                    errorCallback(
                      axios.isAxiosError(error)
                        ? (error?.response?.data as ErrorResponse)
                        : undefined,
                    );
                  }
                  textInputConfig && setInputText('');
                  setLoading(false);
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
                  textInputConfig && setInputText('');
                  hideModal();
                }}
                customStyles={{text: styles.buttonText}}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
