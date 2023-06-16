import React, {createContext, useContext, useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';

import {ConfirmationModal, HistoryModal, InformationModal} from '../components';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

interface ModalContextType {
  showHistoryModal: ({entries}: HistoryModalData) => void;
  showInformationModal: ({text, type}: InformationModalData) => void;
  showConfirmationModal: ({
    title,
    text,
    acceptCallback,
    textInputConfig,
  }: ConfirmationModalData) => void;
}

type HistoryModalData = {
  entries: number[];
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

export const ModalContext = createContext<ModalContextType | null>(null);

/**
 * Context provider to allow the usage of modals along the whole page.
 * @param props component props
 *   @param props.children the children component to be inside the context wrapper
 * @returns a modal context provider
 */
export const ModalContextProvider = ({children}: ModalContextProviderProps) => {
  const [historyModalData, setHistoryModalData] =
    useState<HistoryModalData | null>(null);
  const [informationModalData, setInformationModalData] =
    useState<InformationModalData | null>(null);
  const [confirmationModalData, setConfirmationModalData] =
    useState<ConfirmationModalData | null>(null);

  const showHistoryModal = (data: HistoryModalData) => {
    setHistoryModalData(data);
  };

  const showInformationModal = (data: InformationModalData) => {
    setInformationModalData(data);
  };

  const showConfirmationModal = (data: ConfirmationModalData) => {
    setConfirmationModalData(data);
  };

  return (
    <ModalContext.Provider
      value={{showHistoryModal, showInformationModal, showConfirmationModal}}>
      {children}
      {historyModalData && (
        <HistoryModal
          historyEntries={historyModalData.entries}
          hideModal={() => setHistoryModalData(null)}
        />
      )}
      {informationModalData && (
        <InformationModal
          text={informationModalData.text}
          hideModal={() => setInformationModalData(null)}
          type={informationModalData.type}
        />
      )}
      {confirmationModalData && (
        <ConfirmationModal
          title={confirmationModalData.title}
          hideModal={() => setConfirmationModalData(null)}
          text={confirmationModalData.text}
          acceptCallback={confirmationModalData.acceptCallback}
          textInputConfig={confirmationModalData.textInputConfig}
        />
      )}
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
