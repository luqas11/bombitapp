import React, {createContext, useContext, useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';

import {ConfirmationModal, HistoryModal, InformationModal} from '../components';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

type InformationModalData = {
  text: string;
  type?: 'ERROR' | 'SUCCESS';
};

type ConfirmationModalData = {
  title: string;
  text: string;
  acceptCallback: (value?: string) => void;
  textInputConfig?: {
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    validation?: (value: string) => boolean;
  };
};

interface ModalContextType {
  showHistoryModal: (data: number[]) => void;
  showInformationModal: ({text, type}: InformationModalData) => void;
  showConfirmationModal: ({
    title,
    text,
    acceptCallback,
    textInputConfig,
  }: ConfirmationModalData) => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

/**
 * Context provider to allow the usage of modals along the whole page.
 * @param props component props
 *   @param props.children the children component to be inside the context wrapper
 * @returns a modal context provider
 */
export const ModalContextProvider = ({children}: ModalContextProviderProps) => {
  const [historyModalData, setHistoryModalData] = useState<number[]>([]);
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const [informationModalData, setInformationModalData] =
    useState<InformationModalData>({} as InformationModalData);
  const [isInformationVisible, setInformationVisible] = useState(false);
  const [confirmationModalData, setConfirmationModalData] =
    useState<ConfirmationModalData>({} as ConfirmationModalData);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const showHistoryModal = (data: number[]) => {
    setHistoryModalData(data);
    setHistoryVisible(true);
  };

  const showInformationModal = ({text, type}: InformationModalData) => {
    setInformationModalData({text, type});
    setInformationVisible(true);
  };

  const showConfirmationModal = ({
    title,
    text,
    acceptCallback,
    textInputConfig,
  }: ConfirmationModalData) => {
    setConfirmationModalData({title, text, acceptCallback, textInputConfig});
    setConfirmationVisible(true);
  };

  return (
    <ModalContext.Provider
      value={{showHistoryModal, showInformationModal, showConfirmationModal}}>
      {children}
      <HistoryModal
        historyEntries={historyModalData}
        visible={isHistoryVisible}
        hideModal={() => {
          setHistoryModalData([]);
          setHistoryVisible(false);
        }}
      />
      <InformationModal
        text={informationModalData.text}
        visible={isInformationVisible}
        hideModal={() => {
          setInformationModalData({} as InformationModalData);
          setInformationVisible(false);
        }}
        type={informationModalData.type}
      />
      <ConfirmationModal
        title={confirmationModalData.title}
        visible={isConfirmationVisible}
        hideModal={() => {
          setConfirmationModalData({} as ConfirmationModalData);
          setConfirmationVisible(false);
        }}
        text={confirmationModalData.text}
        acceptCallback={confirmationModalData.acceptCallback}
        textInputConfig={confirmationModalData.textInputConfig}
      />
    </ModalContext.Provider>
  );
};

/**
 * Custom hook to check that the context is not null before returning it.
 * @returns a modal context custom hook
 */
export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      'useCurrentUser has to be used within <CurrentUserContext.Provider>',
    );
  }

  return modalContext;
};
