import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import game from '../scenes/game'
import { IInitialState } from '../reducers/interfaces';
import { connect } from 'react-redux';

type GameNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOST]: undefined;
  [AppRoute.JOIN]: undefined;
  [AppRoute.LOBBY]: undefined;
}

export interface HostGameScreenProps {
  navigation: StackNavigationProp<GameNavigatorParams, AppRoute.HOST>;
  route: RouteProp<GameNavigatorParams, AppRoute.HOST>;
}

export interface JoinGameScreenProps {
    navigation: StackNavigationProp<GameNavigatorParams, AppRoute.JOIN>;
    route: RouteProp<GameNavigatorParams, AppRoute.JOIN>;
}

export interface LobbyScreenProps {
  navigation: StackNavigationProp<GameNavigatorParams, AppRoute.LOBBY>;
  route: RouteProp<GameNavigatorParams, AppRoute.LOBBY>;
}

const Stack = createStackNavigator<GameNavigatorParams>();

interface IGameProps {
  inLobby: boolean;
}

export const Game = (props: IGameProps): React.ReactElement => (
  <Stack.Navigator headerMode='none' screenOptions={{animationEnabled: true}}>
    {
      !props.inLobby
      ? (
        <Stack.Screen name={AppRoute.JOIN} component={game.JoinScreen}/>
      )
      : (
        <Stack.Screen name={AppRoute.LOBBY} component={game.LobbyScreen}/>
      )
    }
    
  </Stack.Navigator>
);

const mapStateToProps = (state: IInitialState): IGameProps => {
  const { inLobby } = state.game;

  return { inLobby };
};

const GameNavigator = connect(mapStateToProps, {})(Game);

export { GameNavigator };
