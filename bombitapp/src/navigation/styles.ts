import {StyleSheet} from 'react-native';

import Colors from '../constants/colors';

export const styles = StyleSheet.create({
  container: {backgroundColor: Colors.primaryBackground},
  header: {backgroundColor: Colors.secondaryBackground, height: 65},
  headerTitle: {color: Colors.text, fontSize: 22},
  tabBar: {
    backgroundColor: Colors.secondaryBackground,
    paddingBottom: 14,
    paddingTop: 14,
    height: 80,
    borderTopWidth: 0,
  },
  tabBarLabel: {
    fontSize: 12,
  },
});
