import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from './Login';
import Inbox from './Inbox';
import CreateAlert from './CreateAlert';

const loginName = "Login";
const inboxName = "Inbox";
const alertName = "Alert";

const Tab = createBottomTabNavigator();

function MainContainer() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={loginName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === loginName) {
              iconName = focused ? 'log-in' : 'log-in-outline';

            } else if (rn === inboxName) {
              iconName = focused ? 'mail' : 'mail-outline';

            } else if (rn === alertName) {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={loginName} component={Login} />
        <Tab.Screen name={inboxName} component={Inbox} />
        <Tab.Screen name={alertName} component={CreateAlert} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;