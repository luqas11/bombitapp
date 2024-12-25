import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {color: Colors.text, fontSize: 20, marginBottom: 20},
  value: {color: Colors.text, fontSize: 36},
  button: {width: 140},
});
