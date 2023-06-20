/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AboutScreen, DashboardScreen, SettingsScreen} from '../screens';
import {
  ABOUT_SCREENNAME,
  DASHBOARD_SCREENNAME,
  SETTINGS_SCREENNAME,
} from './constants';
import {useStore} from '../state';
import {RequestStatuses} from '../components/RequestStatusIndicator';
import {styles} from './styles';

const Tab = createBottomTabNavigator();

/**
 * App main navigator. Controls the navigation between the 3 app screens.
 * @returns a tab navigator component
 */
const CustomNavigator = () => {
  const fetchStatus = useStore(state => state.fetchStatus);
  const setRequestStatus = useStore(state => state.setRequestStatus);

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
      sceneContainerStyle={styles.container}
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
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
