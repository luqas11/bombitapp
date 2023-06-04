import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.button,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    height: 100,
    width: 100,
  },
  responseOk: {backgroundColor: '#009900'},
  responseError: {backgroundColor: '#990000'},
});
