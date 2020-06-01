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
import Home from './Home'
import Authenticate from '../scenes/auth/Authenticate'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

/**
 * Declaring Tab to be a Stack Navigator
 */
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

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
        <ApplicationProvider
        {...eva}
        theme={eva.light}
        >
            <SafeAreaProvider>
                <NavigationContainer>
                    <RootStack.Navigator mode="modal" headerMode="none">
                        <RootStack.Screen name="Main" component={mainStack} />
                        <RootStack.Screen name="Authenticate" component={Authenticate} />
                    </RootStack.Navigator>
                </NavigationContainer>
        
            </SafeAreaProvider>
        </ApplicationProvider>
    )
}

export default tabs