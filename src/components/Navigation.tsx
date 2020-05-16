import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Home from './Home'
import About from './About';
import Vivs from './Vivs'
import Login from './auth/Login';

/**
 * Declaring Tab to be a Bottom Tab Navigator
 */
const Tab = createBottomTabNavigator()


/**
 * Wrapper element for all tabs
 */
const tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({color}) => (
                            <Icon name={'home'} size={32} color={color} />
                        )
                    }} 
                />
                <Tab.Screen
                    name="Authed Page"
                    component={About}
                    options={{
                        tabBarIcon: ({color}) => (
                            <Icon name={'local-hotel'} size={32} color={color} />
                        )
                    }} 
                />
                <Tab.Screen
                     name="Login"
                     component={Login}
                     options={{
                         tabBarIcon: ({color}) => (
                             <Icon name={'local-hotel'} size={32} color={color} />
                         )
                     }} 
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default tabs