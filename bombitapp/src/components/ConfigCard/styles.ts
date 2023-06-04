import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 16,
    borderLeftWidth: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {color: Colors.text, fontSize: 20, marginBottom: 20},
  button: {height: 100, aspectRatio: 1},
  buttonsContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  statusOff: {
    borderColor: 'gray',
  },
  statusOn: {
    borderColor: 'green',
  },
  statusStop: {
    borderColor: 'red',
  },
});
