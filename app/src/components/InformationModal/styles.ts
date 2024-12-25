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
    gap: 20,
  },
  text: {color: Colors.text, fontSize: 16},
  buttonText: {color: Colors.text, fontSize: 16},
  messageError: {borderWidth: 2, borderColor: '#BB0000'},
  messageSuccess: {borderWidth: 2, borderColor: '#009900'},
});
