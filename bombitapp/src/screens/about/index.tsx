import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

/**
 * About Screen, that displays some version history notes.
 * @returns a screen component
 */
const AboutScreen = () => {
  return (
    <View>
      <Text style={styles.text}>AboutScreen</Text>
    </View>
  );
};

export default AboutScreen;
