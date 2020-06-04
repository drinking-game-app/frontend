import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import game from '../scenes/game'

type GameNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOST]: undefined;
  [AppRoute.JOIN]: undefined;
}

export interface HostGameScreenProps {
  navigation: StackNavigationProp<GameNavigatorParams, AppRoute.HOST>;
  route: RouteProp<GameNavigatorParams, AppRoute.HOST>;
}

export interface JoinGameScreenProps {
    navigation: StackNavigationProp<GameNavigatorParams, AppRoute.JOIN>;
    route: RouteProp<GameNavigatorParams, AppRoute.JOIN>;
}

const Stack = createStackNavigator<GameNavigatorParams>();

export const GameNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none' screenOptions={{animationEnabled: true}}>
    <Stack.Screen name={AppRoute.JOIN} component={game.JoinScreen}/>
  </Stack.Navigator>
);
