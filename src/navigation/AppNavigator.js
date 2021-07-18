import React from 'react';
import {Icon, Text} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import Home from '../screens/Home';
import Discover from '../screens/Discover';
import Favorite from '../screens/Favorite';
import Settings from '../screens/Settings';
import DetailScreen from '../screens/DetailScreen';
import Signin from '../screens/auth/Signin';
import Signup from '../screens/auth/Signup';
import Account from '../screens/auth/Account';

//components
import {Loading} from '../components';
import getColorTheme from '../helpers/theme';

const Bottom = createBottomTabNavigator();
const Stack = createStackNavigator();

function DiscoverStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function SettingStack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Setting" component={Settings} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const color = getColorTheme();

  const linking = {
    prefixes: ['weatherstation://', 'https://weatherstation-8be7b.web.app'],
    config: {
      screens: {
        Home: 'home',
        Discover: 'discover',
        Favorite: 'favorite',
        Settings: 'settings',
      },
    },
  };

  return (
    <NavigationContainer linking={linking} fallback={<Loading />}>
      <Bottom.Navigator
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'red',
          style: {
            backgroundColor: color.background,
          },
        }}>
        <Bottom.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Bottom.Screen
          name="Discover"
          component={DiscoverStack}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="search" type="feather" size={size} color={color} />
            ),
          }}
        />
        <Bottom.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name="heart" type="feather" size={size} color={color} />
            ),
          }}
        />
        <Bottom.Screen
          name="Settings"
          component={SettingStack}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="settings" size={size} color={color} />
            ),
          }}
        />
      </Bottom.Navigator>
    </NavigationContainer>
  );
}
