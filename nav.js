import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './library/Login';
import Inbox from './library/Inbox';
import CreateAlert from './library/CreateAlert';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options = {{headerShown: false}}/>
        <Stack.Screen name="Inbox" component={Inbox} options = {{headerShown: false}}/>
        <Stack.Screen name = "Alert" component={CreateAlert} options = {{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
