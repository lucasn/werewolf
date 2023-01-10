import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './src/screens/Home';
import Server from './src/screens/Server';
import Client from './src/screens/Client';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start Screen" component={Home}/>
        <Stack.Screen name="Server" component={Server}/>
        <Stack.Screen name="Client" component={Client}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
