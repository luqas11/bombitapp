import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/colors';
import {styles} from './styles';

export enum RequestStatuses {
  IN_PROGRESS,
  RESPONSE_ERROR,
  RESPONSE_OK,
  NO_DATA,
}

type RequestStatusIndicatorProps = {
  requestState: RequestStatuses;
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
    [RequestStatuses.RESPONSE_OK]: styles.responseOk,
    [RequestStatuses.RESPONSE_ERROR]: styles.responseError,
  };
  const inidcatorIcons = {
    [RequestStatuses.NO_DATA]: 'information',
    [RequestStatuses.RESPONSE_OK]: 'check',
    [RequestStatuses.RESPONSE_ERROR]: 'alert',
  };

  return (
    <View
      style={[
        styles.container,
        (requestState === RequestStatuses.RESPONSE_OK ||
          requestState === RequestStatuses.RESPONSE_ERROR) &&
          backgroundStyles[requestState],
      ]}>
      {requestState === RequestStatuses.IN_PROGRESS ? (
        <ActivityIndicator size={70} color={'#00FFFF'} />
      ) : (
        <MaterialCommunityIcons
          name={inidcatorIcons[requestState]}
          color={Colors.text}
          size={50}
        />
      )}
    </View>
  );
};

export default RequestStatusIndicator;
