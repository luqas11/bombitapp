import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(80, 80, 80, 0.8)',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: Colors.secondaryBackground,
    width: '80%',
    borderRadius: 16,
    padding: 16,
    gap: 26,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
  },
  text: {color: Colors.text, fontSize: 16},
  input: {color: Colors.text, backgroundColor: Colors.button, fontSize: 16},
  buttonsContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  buttonText: {color: Colors.text, fontSize: 16},
});
