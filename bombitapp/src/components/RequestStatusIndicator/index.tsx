import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/colors';
import {styles} from './styles';

type RequestStatusIndicatorProps = {
  requestState: 'IN_PROGRESS' | 'RESPONSE_ERROR' | 'RESPONSE_OK' | undefined;
};

/**
 * Request state indicator, with a loading animation indicating the current request status.
 * @param props component props
 *   @param props.requestState current request state
 * @returns an indicator component
 */
const RequestStatusIndicator = ({
  requestState,
}: RequestStatusIndicatorProps) => {
  const backgroundStyles = {
    RESPONSE_OK: styles.responseOk,
    RESPONSE_ERROR: styles.responseError,
  };
  const inidcatorIcons = {
    NO_DATA: 'information',
    RESPONSE_OK: 'check',
    RESPONSE_ERROR: 'alert',
  };

  return (
    <View
      style={[
        styles.container,
        requestState &&
          requestState !== 'IN_PROGRESS' &&
          backgroundStyles[requestState],
      ]}>
      {requestState === 'IN_PROGRESS' ? (
        <ActivityIndicator size={70} color={'#00FFFF'} />
      ) : (
        <MaterialCommunityIcons
          name={inidcatorIcons[requestState ?? 'NO_DATA']}
          color={Colors.text}
          size={50}
        />
      )}
    </View>
  );
};

export default RequestStatusIndicator;
