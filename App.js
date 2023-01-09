import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from './components/StartScreen';
import Host from './components/Host';
import Client from './components/Client';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start Screen" component={StartScreen}/>
        <Stack.Screen name="Host" component={Host}/>
        <Stack.Screen name="Client" component={Client} options={{headerRight: () => (<Button onPress={() => console.log('foi')} title="Teste"/>)}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
