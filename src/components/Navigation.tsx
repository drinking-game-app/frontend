/*
 * File: Navigation.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Handles the navigation for the application
 * Last Modified: Saturday, 16th May 2020 8:57:33 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Home from './Home'
import About from './About';
import Login from './auth/Login';
import { View, Text, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Declaring Tab to be a Stack Navigator
 */
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function ModalScreen({ navigation }: any) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>This will be the login screen</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }

const mainStack = () => {
    return( 
        <MainStack.Navigator headerMode="none">
            <MainStack.Screen name="Home" component={Home} />
        </MainStack.Navigator>
    )
}

/**
 * Wrapper element for all tabs
 */
const tabs = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootStack.Navigator mode="modal" headerMode="none">
                    <RootStack.Screen name="Main" component={mainStack} />
                    <RootStack.Screen name="Authenticate" component={ModalScreen} />
                </RootStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default tabs