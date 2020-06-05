import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import main from '../scenes/main';

type MainNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOME]: undefined;
}

export interface HomeScreenProps {
  navigation: StackNavigationProp<MainNavigatorParams, AppRoute.HOME>;
  route: RouteProp<MainNavigatorParams, AppRoute.HOME>;
}

const Stack = createStackNavigator<MainNavigatorParams>();

export const MainNavigator = (props: MainNavigatorParams): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none' screenOptions={{animationEnabled: true}}>
    <Stack.Screen name={AppRoute.HOME} component={main.Home}/>
  </Stack.Navigator>
);
