import React, {createContext, useContext, useState} from 'react';

import {HistoryModal} from '../components';

type ModalContextProviderProps = {
  children: React.ReactNode;
};

interface ModalContextType {
  showHistoryModal: (data: number[]) => void;
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

  const showHistoryModal = (data: number[]) => {
    setHistoryModalData(data);
    setHistoryVisible(true);
  };

  return (
    <ModalContext.Provider value={{showHistoryModal}}>
      {children}
      <HistoryModal
        historyEntries={historyModalData}
        visible={isHistoryVisible}
        hideModal={() => {
          setHistoryModalData([]);
          setHistoryVisible(false);
        }}
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
