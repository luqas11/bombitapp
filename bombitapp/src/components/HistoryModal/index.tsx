import React from 'react';
import {FlatList, Modal, Text, View} from 'react-native';

import ButtonWithIcon from '../ButtonWithIcon';
import {parseTime} from '../../helpers';
import {styles} from './styles';

type HistoryModalProps = {
  historyEntries: number[];
  visible: boolean;
  hideModal: () => void;
};

/**
 * History modal component, with a title and a time entry list. If the given entries are less than 10, the list will be filled with placeholders.
 * @param props component props
 *   @param props.historyEntries array with time entries to be shown in the list
 *   @param props.visible boolean indicating whether the modal is visible or hidden
 *   @param props.hideModal function to hide the modal
 * @returns a modal component
 */
const HistoryModal = ({
  historyEntries,
  visible,
  hideModal,
}: HistoryModalProps) => {
  const LIST_MIN_LENGTH = 10;
  /**
   * Renders a history entry with top and bottom dividers
   *   @param item list item
   *   @param item.item list item value
   * @returns a list entry component
   */
  const renderItem = ({item}: {item: number}) => (
    <View>
      <View style={styles.divider} />
      <Text style={styles.entryText}>{parseTime(item)}</Text>
    </View>
  );

  return (
    <Modal
      animationType={'slide'}
      visible={visible}
      transparent={true}
      onRequestClose={hideModal}>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Historial de la entrada</Text>
          <View>
            <FlatList data={historyEntries} renderItem={renderItem} />
            {historyEntries.length < LIST_MIN_LENGTH &&
              Array.from(
                {length: LIST_MIN_LENGTH - historyEntries.length},
                (_, i) => (
                  <View key={i}>
                    <View style={styles.divider} />
                    <Text style={styles.entryText}>-</Text>
                  </View>
                ),
              )}
            <View style={styles.divider} />
          </View>
          <ButtonWithIcon
            iconConfig={{name: 'close', size: 28}}
            onPress={hideModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HistoryModal;
