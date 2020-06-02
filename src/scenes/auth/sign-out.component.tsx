/*
 * File: Signout.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 16th May 2020 8:19:18 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Handles user signout
 * Last Modified: Saturday, 16th May 2020 8:56:18 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../actions";
import LogoutWithGoogle from "./platformSpecific/LogoutWithGoogle";
import { Button } from "@ui-kitten/components";
import { IInitialState } from "../../reducers/interfaces";
import { SignoutScreenScreenProps } from "../../navigation/auth.navigator";
import { AppRoute } from "../../navigation/app-routes";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Form");

/**
 * Interface Props
 * for the component
 */
type IProps = {
  name: string;
  token: string;
  authedWithGoogle: boolean;
};

/**
 * Interface actions
 * for the component
 */
interface IActions extends SignoutScreenScreenProps {
  logout: (body: object) => void;
}

const SignoutScreen = (props: IProps & IActions) => {
  /**
   * Logs out the user from their current
   * session
   */
  const submit = () => {
    const { token } = props;

    props.logout({ token });
  };

  const navigateSignIn = (): void => {
    props.navigation.navigate(AppRoute.SIGN_IN)
  }


  const { name, authedWithGoogle, token } = props;

  // if(!token || token == "") navigateSignIn()
  return (
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.title}>Welcome, {name}</Text>

      {authedWithGoogle ? (
        <LogoutWithGoogle />
      ) : (
        <Button onPress={submit} style={styles.formButton}>
          Signout
        </Button>
      )}

        <Button style={styles.formButton} onPress={() => props.navigation.navigate(AppRoute.HOME)} style={styles.formButton}>
          Home
        </Button>

    </SafeAreaView>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { name, token, authedWithGoogle } = state;

  return {
    name,
    token,
    authedWithGoogle,
  };
};

export default connect<IProps, IActions>(mapStateToProps, { logout })(SignoutScreen);
