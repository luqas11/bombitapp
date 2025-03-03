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
  title: {
    color: Colors.text,
    fontSize: 20,
    textAlign: 'center',
  },
  entryText: {
    color: Colors.text,
    fontSize: 16,
    marginVertical: 8,
    textAlign: 'center',
  },
  divider: {height: 1, backgroundColor: Colors.text},
  buttonText: {color: Colors.text, fontSize: 16},
});
