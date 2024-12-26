/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AboutScreen, DashboardScreen, SettingsScreen} from '../screens';
import {
  ABOUT_SCREENNAME,
  DASHBOARD_SCREENNAME,
  SETTINGS_SCREENNAME,
} from './constants';
import {useStore} from '../state';
import {RequestStatuses} from '../components/RequestStatusIndicator';
import {
  DEVICES_DEFAULT_NAMES,
  DEVICE_IP_STORAGE_KEY,
  DEVICE_NAME_PREFIX,
} from '../constants';
import {setBaseURL} from '../helpers';
import {styles} from './styles';

const Tab = createBottomTabNavigator();

/**
 * App main navigator. Controls the navigation between the 3 app screens.
 * @returns a tab navigator component
 */
const CustomNavigator = () => {
  const fetchStatus = useStore(state => state.fetchStatus);
  const setRequestStatus = useStore(state => state.setRequestStatus);
  const setDevicesNames = useStore(state => state.setDevicesNames);
  const setDeviceIP = useStore(state => state.setDeviceIP);

  useEffect(() => {
    /**
     * Gets the devices names from AsyncStorage and sets them to the store
     */
    const getDevicesNames = async () => {
      let name0 = DEVICES_DEFAULT_NAMES[0];
      let name1 = DEVICES_DEFAULT_NAMES[1];
      try {
        const _name0 = await AsyncStorage.getItem(DEVICE_NAME_PREFIX + '0');
        const _name1 = await AsyncStorage.getItem(DEVICE_NAME_PREFIX + '1');
        if (_name0) {
          name0 = _name0;
        }
        if (_name1) {
          name1 = _name1;
        }
      } catch (e) {}
      setDevicesNames([name0, name1]);
    };

    /**
     * Gets the device IP address from AsyncStorage and sets it to the store
     */
    const getDeviceIP = async () => {
      try {
        const ip = await AsyncStorage.getItem(DEVICE_IP_STORAGE_KEY);
        if (ip) {
          setBaseURL(ip);
          setDeviceIP(ip);
        }
      } catch (e) {}
    };

    getDevicesNames();
    getDeviceIP();
  }, [setDevicesNames, setDeviceIP]);

  useEffect(() => {
    let isMounted = true;
    /**
     * Gets status from the remote device.
     */
    const updateStatus = async () => {
      setRequestStatus(RequestStatuses.IN_PROGRESS);
      try {
        await fetchStatus();
        setRequestStatus(RequestStatuses.RESPONSE_OK);
      } catch (error) {
        setRequestStatus(RequestStatuses.RESPONSE_ERROR);
      } finally {
        setTimeout(() => {
          isMounted && updateStatus();
        }, 2000);
      }
    };

    updateStatus();
    return () => {
      isMounted = false;
    };
  }, [fetchStatus, setRequestStatus]);

  return (
    <Tab.Navigator
      initialRouteName={DASHBOARD_SCREENNAME}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        sceneStyle: styles.container,
      }}>
      <Tab.Screen
        name={DASHBOARD_SCREENNAME}
        options={{
          title: 'Estado del sistema',
          tabBarLabel: 'Estado',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialCommunityIcons name="monitor" color={color} size={28} />
          ),
        }}
        component={DashboardScreen}
      />
      <Tab.Screen
        name={SETTINGS_SCREENNAME}
        options={{
          title: 'Ajustes',
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialCommunityIcons name="tools" color={color} size={28} />
          ),
        }}
        component={SettingsScreen}
      />
      <Tab.Screen
        name={ABOUT_SCREENNAME}
        options={{
          title: 'Información de la app',
          tabBarLabel: 'Info',
          tabBarIcon: ({color}: {color: string}) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={28}
            />
          ),
        }}
        component={AboutScreen}
      />
    </Tab.Navigator>
  );
};

export default CustomNavigator;
