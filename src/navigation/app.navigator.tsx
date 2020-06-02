import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { MainNavigator } from './main.navigator';
import { AppRoute } from './app-routes';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.HOME]: undefined;
}

const Stack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
  <Stack.Navigator {...props} mode="modal" headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={MainNavigator}/>
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
  </Stack.Navigator>
);
