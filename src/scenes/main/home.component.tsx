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
import { View, SafeAreaView } from "react-native";
import Constants from 'expo-constants'
import { Button, Layout, Text } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import { IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import {gameActions} from "../../actions";
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
  hostGame: (body: IHostGame) => void;
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
    if(props.token && props.token !== "") {
      props.hostGame({username: props.name, lobbyName: 'RYAN'})
      props.navigation.navigate(AppRoute.GAME)
    } else props.navigation.navigate(AppRoute.AUTH)
  }

  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subTitle}>
        Application Running in {__DEV__ ? "Development" : "Production"} mode
      </Text>
      <Text style={styles.subTitle}>Server URL - {Constants.manifest.extra.SERVER_URL}</Text>
      {
        props.token && props.token !== ""
        && <SignoutScreen />
      }
      <View>
        <Button
          style={styles.formButton}
          onPress={() => hostOrLogin()}
        >
          Host
        </Button>
        <Button 
          style={styles.formButton}
            onPress={() => props.navigation.navigate(AppRoute.GAME)}  
        >
          Join
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

export default connect(mapStateToProps, gameActions)(Home)