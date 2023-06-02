import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

/**
 * Main dashboard screen, that displays all device information and status.
 * @returns a screen component
 */
const DashboardScreen = () => {
  return (
    <View>
      <Text style={styles.text}>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;
