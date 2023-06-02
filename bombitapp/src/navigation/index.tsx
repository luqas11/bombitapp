/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AboutScreen, DashboardScreen, SettingsScreen} from '../screens';
import {styles} from './styles';
import {
  ABOUT_SCREENNAME,
  DASHBOARD_SCREENNAME,
  SETTINGS_SCREENNAME,
} from './constants';

type TabBarIconProps = {color: string; size: number};

const Tab = createBottomTabNavigator();

/**
 * App main navigator. Controls the navigation between the 3 app screens.
 * @returns a tab navigator component
 */
const CustomNavigator = (): JSX.Element => {
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
          tabBarIcon: ({color}: TabBarIconProps) => (
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
          tabBarIcon: ({color}: TabBarIconProps) => (
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
          tabBarIcon: ({color}: TabBarIconProps) => (
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
