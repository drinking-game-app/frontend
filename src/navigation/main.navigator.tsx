import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import main from '../scenes/main';

type AuthNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOME]: undefined;
}

export interface HomeScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, AppRoute.HOME>;
  route: RouteProp<AuthNavigatorParams, AppRoute.HOME>;
}

const Stack = createStackNavigator<AuthNavigatorParams>();

export const MainNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={main.Home}/>
  </Stack.Navigator>
);
