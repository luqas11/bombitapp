import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statusOff: {
    borderColor: 'gray',
  },
  statusOn: {
    borderColor: 'green',
  },
  statusStopped: {
    borderColor: 'red',
  },
  name: {color: Colors.text, fontSize: 20, marginBottom: 4},
  time: {color: Colors.text, fontSize: 42},
  recordsContainer: {display: 'flex', flexDirection: 'row', gap: 12},
  recordTitle: {color: Colors.text, fontSize: 14},
  recordValue: {color: Colors.text, fontSize: 18},
  button: {height: 100, aspectRatio: 1},
  sensorOff: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
  sensorOn: {
    color: 'green',
    fontSize: 14,
    marginTop: 4,
  },
});
