import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { AppRoute } from './app-routes';
import { GameNavigator } from './game.navigator';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.GAME]: undefined;
}

const Stack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
  <Stack.Navigator {...props} mode="modal" headerMode='none' screenOptions={{animationEnabled: true}}>
    <Stack.Screen name={AppRoute.HOME} component={MainNavigator}/>
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
    <Stack.Screen name={AppRoute.GAME} component={GameNavigator}/>
  </Stack.Navigator>
);
