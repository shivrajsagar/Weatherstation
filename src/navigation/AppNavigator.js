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
import {Loading} from '../components';

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

export default function AppNavigator() {
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
        initialRouteName="Discover"
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'red',
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
          component={Settings}
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
