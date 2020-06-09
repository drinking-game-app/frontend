/*
 * File: Home.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: A simple static page to demonstrate some features of react native
 * Last Modified: Saturday, 16th May 2020 8:57:16 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { View } from "react-native";
import { Button, Layout, Text, Icon, IconProps } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import { IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { gameActions } from "../../actions";
import { HomeScreenProps } from "../../navigation/main.navigator";
import { IHostGame } from "../../actions/game";
import SignoutScreen from "../auth/sign-out.component";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("App");

interface IActions extends HomeScreenProps {
  hostGameAction: (body: IHostGame) => void;
}

interface IProps {
  name: string;
  token: string;
  isHost: boolean;
}

/**
 * Rendering the view
 */
const Home = (props: IProps & IActions) => {
  /**
   * If the user is logged in, start a new game as a host
   *
   * if not redirect them to auth
   */
  const hostOrLogin = () => {
    if (props.token && props.token !== "") {
      props.hostGameAction({ username: props.name, token: props.token });
      props.navigation.navigate(AppRoute.GAME);
    } else props.navigation.navigate(AppRoute.AUTH);
  };

  const settingsIcon = (props: IconProps) => (
    <Icon {...props} name="settings-2-outline" />
  )

  const renderSignoutAndCogContainer = () => {
    if(props.token && props.token !== "") return (
      <View style={styles.signoutAndCogContainer}>
        <SignoutScreen />
        <Button
            style={styles.settingsCog}
            onPress={() => props.navigation.navigate(AppRoute.DEVINFO)}
            appearance='ghost' 
            accessoryRight={settingsIcon}
        ></Button>
      </View>
    )

    return (
      <View style={styles.signoutAndCogContainer}>
        <Button
            style={styles.settingsCog}
            onPress={() => props.navigation.navigate(AppRoute.DEVINFO)}
            appearance='ghost' 
            accessoryRight={settingsIcon}
        ></Button>
      </View>
    )
  }

  return (
    <Layout style={styles.container}>
      {renderSignoutAndCogContainer()}
      <Text style={styles.title}>
        WHO IS 
      </Text>
      <Text style={styles.titleRed}>MORE LIKELY</Text>
      <Text style={styles.title}>
        TO
      </Text>

      <View>
        <Button
          style={styles.formButton}
          onPress={() => hostOrLogin()}
        >
          HOST
        </Button>

        <Button
          style={styles.formButton}
          onPress={() => props.navigation.navigate(AppRoute.GAME)}
        >
          JOIN
        </Button>
      </View>
    </Layout>
  );
};

const mapStateToProps = (state: IInitialState): IProps => {
  const { token, name } = state.auth;
  const { isHost } = state.game;

  return { token, name, isHost };
};

export default connect(mapStateToProps, gameActions)(Home);
