import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './library/Login';
import Inbox from './library/Inbox';
import CreateAlert from './library/CreateAlert';

const Stack = createStackNavigator();

export default class NavExample extends Component {
    render() {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Inbox" component={Inbox}/>
                <Stack.Screen name="Alert" component={CreateAlert}/>
              </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
