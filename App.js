import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//importacion para la navegacion entre pantallas
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

  const Stack = createStackNavigator();
//creacion de la variable de los stacks


//importacion de las screens
import CreateUsers from './Screens/CreateUsers';
import UserList from './Screens/UserList'
import UserDetails from './Screens/UserDetails';

function MyStack() {
  return(
    //creamos la navegacion de pantallas
    //y dentro creamos las pantallas
    <Stack.Navigator>
      <Stack.Screen name = "UserList" 
      component = {UserList} 
      options = {{title: 'Users List'}}/>

      <Stack.Screen name = "CreateUsers" 
      component = {CreateUsers} 
      options = {{title: 'Create a New User'}}/>

      <Stack.Screen name = "UserDetails" 
      component = {UserDetails} 
      options = {{title: 'User Details'}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

