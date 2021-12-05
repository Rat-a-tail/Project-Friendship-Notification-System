import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './library/MainContainer';

import Login from './library/Login';
import Inbox from './library/Inbox';
import CreateAlert from './library/CreateAlert';

const Stack = createStackNavigator();


export default function App() {
  return (
    <MainContainer/>
  );
};
