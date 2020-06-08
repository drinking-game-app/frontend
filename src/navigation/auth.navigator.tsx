import React from "react";
import { RouteProp } from "@react-navigation/core";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { AppRoute } from "./app-routes";
import { AppNavigatorParams } from "./app.navigator";
import auth from "../scenes/auth";
import { connect } from "react-redux";
import { IInitialState } from "../reducers/interfaces";
import game from "../scenes/game";
import * as actions from "../actions/game";

type AuthNavigatorParams = AppNavigatorParams & {
  [AppRoute.SIGN_IN]: undefined;
  [AppRoute.SIGN_UP]: undefined;
  [AppRoute.SIGN_OUT]: undefined;
  [AppRoute.HOST]: undefined;
};

export interface SignInScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, AppRoute.SIGN_IN>;
  route: RouteProp<AuthNavigatorParams, AppRoute.SIGN_IN>;
}

export interface RegisterScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, AppRoute.SIGN_UP>;
  route: RouteProp<AuthNavigatorParams, AppRoute.SIGN_UP>;
}

export interface SignoutScreenScreenProps {
  navigation: StackNavigationProp<AuthNavigatorParams, AppRoute.SIGN_OUT>;
  route: RouteProp<AuthNavigatorParams, AppRoute.SIGN_OUT>;
}

export interface IAuthProps {
  token: string;
  init: boolean;
  initGameSock: () => void;
}

const Stack = createStackNavigator<AuthNavigatorParams>();

const Auth = (props: IAuthProps): React.ReactElement => {
  if (!props.init) props.initGameSock();
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: true }}
    >
      {!props.token || props.token == "" ? (
        <>
          <Stack.Screen name={AppRoute.SIGN_IN} component={auth.SignInScreen} />
          <Stack.Screen
            name={AppRoute.SIGN_UP}
            component={auth.RegisterScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={AppRoute.HOST} component={game.LobbyScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: IInitialState): IAuthProps => {
  const { token } = state.auth;
  const { init } = state.game;

  return { token, init };
};

const AuthNavigator = connect(mapStateToProps, actions)(Auth);

export { AuthNavigator };
