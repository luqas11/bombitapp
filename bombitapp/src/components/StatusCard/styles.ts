import {StyleSheet} from 'react-native';

import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statusOff: {
    borderColor: 'gray',
  },
  statusOn: {
    borderColor: 'green',
  },
  statusStop: {
    borderColor: 'red',
  },
  name: {color: Colors.text, fontSize: 20, marginBottom: 4},
  time: {color: Colors.text, fontSize: 42},
  recordsContainer: {display: 'flex', flexDirection: 'row', gap: 12},
  recordTitle: {color: Colors.text, fontSize: 14},
  recordValue: {color: Colors.text, fontSize: 18},
  button: {height: 100, aspectRatio: 1},
});
