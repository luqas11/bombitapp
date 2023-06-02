import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

/**
 * Device settings screen with some options to set device parameters.
 * @returns a screen component
 */
const SettingsScreen = () => {
  return (
    <View>
      <Text style={styles.text}>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;
