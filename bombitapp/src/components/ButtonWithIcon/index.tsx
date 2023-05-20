import React from 'react';
import {Text, TouchableOpacity, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/colors';
import {styles} from './styles';

type ButtonWithIconProps = {
  text?: string;
  iconConfig?: {
    name: string;
    size?: number;
    color?: string;
  };
  customStyles?: ViewStyle;
  onPress: () => void;
  disabled?: boolean;
};

const ButtonWithIcon = ({
  text,
  iconConfig,
  customStyles,
  onPress,
  disabled,
}: ButtonWithIconProps): JSX.Element => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        customStyles,
        disabled && styles.disabledContainer,
      ]}
      onPress={onPress}
      disabled={disabled}>
      {iconConfig && (
        <MaterialCommunityIcons
          name={iconConfig.name}
          size={iconConfig.size ?? 56}
          color={iconConfig.size ?? Colors.text}
        />
      )}
      {text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default ButtonWithIcon;
