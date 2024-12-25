import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondaryBackground,
    borderRadius: 16,
    padding: 16,
  },
  title: {color: Colors.text, fontSize: 20},
  date: {color: Colors.paragraph, fontSize: 16, marginBottom: 20},
  content: {color: Colors.paragraph, fontSize: 16},
});
