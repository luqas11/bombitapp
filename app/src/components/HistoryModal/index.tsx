import React from 'react';
import {FlatList, Modal, Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {fixListLength, parseTime} from '../../helpers';
import {HISTORY_LIST_LENGTH} from '../../constants';
import {styles} from './styles';

type HistoryModalProps = {
  historyEntries?: number[];
  hideModal: () => void;
};

/**
 * History modal component, with a title and a time entry list. If the given entries are less than 10, the list will be filled with placeholders.
 * @param props component props
 *   @param props.historyEntries array with time entries to be shown in the list
 *   @param props.hideModal function to hide the modal
 * @returns a modal component
 */
const HistoryModal = ({historyEntries, hideModal}: HistoryModalProps) => {
  const fixedLengthList = fixListLength(
    historyEntries ?? [],
    HISTORY_LIST_LENGTH,
  );

  /**
   * Renders a history entry with top and bottom dividers
   *   @param item list item
   *   @param item.item list item value
   * @returns a list entry component
   */
  const renderItem = ({item}: {item: number}) => (
    <View>
      <View style={styles.divider} />
      <Text style={styles.entryText}>{item === 0 ? '-' : parseTime(item)}</Text>
    </View>
  );

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      onRequestClose={hideModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Historial de la entrada</Text>
          <View>
            <FlatList data={fixedLengthList} renderItem={renderItem} />
            <View style={styles.divider} />
          </View>
          <ButtonWithIcon
            text={'Cerrar'}
            onPress={hideModal}
            customStyles={{text: styles.buttonText}}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
