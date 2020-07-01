import React from 'react';
import { RouteProp } from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import { AppNavigatorParams } from './app.navigator';
import game from '../scenes/game'
import { IInitialState } from '../reducers/interfaces';
import { connect } from 'react-redux';
import * as actions from "../actions/game";

type LobbyNavigatorParams = AppNavigatorParams & {
  [AppRoute.LOBBY]: undefined;
  [AppRoute.EDIT_USER]: undefined;
  [AppRoute.INGAME]: undefined;
}
export interface LobbyScreenProps {
  navigation: StackNavigationProp<LobbyNavigatorParams, AppRoute.LOBBY>;
  route: RouteProp<LobbyNavigatorParams, AppRoute.LOBBY>;
}

export interface EditUserScreenProps {
  navigation: StackNavigationProp<LobbyNavigatorParams, AppRoute.EDIT_USER>;
  route: RouteProp<LobbyNavigatorParams, AppRoute.EDIT_USER>;
}

export interface GameScreenProps {
  navigation: StackNavigationProp<LobbyNavigatorParams, AppRoute.INGAME>;
  route: RouteProp<LobbyNavigatorParams, AppRoute.INGAME>;
}

const Stack = createStackNavigator<LobbyNavigatorParams>();

interface IGameProps {
  inGame: boolean;
  editUser: boolean;
}

export const Lobby = (props: IGameProps & LobbyNavigatorParams): React.ReactElement => {
  return (
    <Stack.Navigator mode="modal" {...props} headerMode='none' screenOptions={{ animationEnabled: true }}>
      {
        !props.inGame
          ? (
            props.editUser === false
              ? <Stack.Screen name={AppRoute.LOBBY} component={game.LobbyScreen} />
              : <Stack.Screen name={AppRoute.EDIT_USER} component={game.EditUserScreen} />
          )
          : <Stack.Screen name={AppRoute.INGAME} component={game.GameScreen} />
      }
    </Stack.Navigator>
  )
}

const mapStateToProps = (state: IInitialState): IGameProps => {
  const { inGame, editUser } = state.game;

  return { inGame, editUser };
};

const LobbyNavigator = connect(mapStateToProps, actions)(Lobby);

export { LobbyNavigator };
