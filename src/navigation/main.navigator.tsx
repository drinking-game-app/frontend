import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import main from '../scenes/main';

type MainNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOME]: undefined;
  [AppRoute.DEVINFO]: undefined;
  [AppRoute.RULES]: undefined;
}

export interface HomeScreenProps {
  navigation: StackNavigationProp<MainNavigatorParams, AppRoute.HOME>;
  route: RouteProp<MainNavigatorParams, AppRoute.HOME>;
}

export interface DevInfoScreenProps {
  navigation: StackNavigationProp<MainNavigatorParams, AppRoute.HOME>;
  route: RouteProp<MainNavigatorParams, AppRoute.HOME>;
}

export interface RulesScreenProps {
  navigation: StackNavigationProp<MainNavigatorParams, AppRoute.HOME>;
  route: RouteProp<MainNavigatorParams, AppRoute.HOME>;
}

const Stack = createStackNavigator<MainNavigatorParams>();

export const MainNavigator = (props: MainNavigatorParams): React.ReactElement => (
  <Stack.Navigator {...props} mode="modal" headerMode='none' screenOptions={{animationEnabled: true}}>
    <Stack.Screen name={AppRoute.HOME} component={main.Home}/>
    <Stack.Screen name={AppRoute.DEVINFO} component={main.DevInfoScreen}/>
    <Stack.Screen name={AppRoute.RULES} component={main.RulesScreen}/>
  </Stack.Navigator>
);
