import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import game from '../scenes/game'
import { IInitialState } from '../reducers/interfaces';
import { connect } from 'react-redux';
import * as actions from "../actions/game";

type GameNavigatorParams = AppNavigatorParams & {
  [AppRoute.HOST]: undefined;
  [AppRoute.JOIN]: undefined;
  [AppRoute.LOBBY]: undefined;
  [AppRoute.INGAME]: undefined;
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

export interface GameScreenProps {
  navigation: StackNavigationProp<GameNavigatorParams, AppRoute.INGAME>;
  route: RouteProp<GameNavigatorParams, AppRoute.INGAME>;
}

const Stack = createStackNavigator<GameNavigatorParams>();

interface IGameActions extends GameNavigatorParams {
  initGameSock: () => void;
}

interface IGameProps {
  inLobby: boolean;
  inGame: boolean;
  init: boolean;
}

export const Game = (props: IGameProps & IGameActions): React.ReactElement => {
  if(!props.init) props.initGameSock()
  return (
  <Stack.Navigator {...props} headerMode='none' screenOptions={{animationEnabled: true}}>
    {
      !props.inLobby
      ? (
        <Stack.Screen name={AppRoute.JOIN} component={game.JoinScreen}/>
      )
      : (
        !props.inGame
        ? <Stack.Screen name={AppRoute.LOBBY} component={game.LobbyScreen}/>
        : <Stack.Screen name={AppRoute.INGAME} component={game.GameScreen}/>
      )
    }
  </Stack.Navigator>
  )
}

const mapStateToProps = (state: IInitialState): IGameProps => {
  const { inLobby, inGame, init } = state.game;

  return { inLobby, inGame, init };
};

const GameNavigator = connect(mapStateToProps, actions)(Game);

export { GameNavigator };
