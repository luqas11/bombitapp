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

/**
 * Button with an icon and a label.
 * @param props
 *   @param props.text label text. If undefined, Text component won't be rendered
 *   @param props.customStyles button container custom styles
 *   @param props.iconConfig icon configuration
 *     @param props.iconConfig.name icon name
 *     @param props.iconConfig.color icon color
 *     @param props.iconConfig.size icon size
 *   @param props.onPress function to be called when the button in pressed
 *   @param props.disabled if true, the button is not pressable
 * @returns a button component
 */

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
