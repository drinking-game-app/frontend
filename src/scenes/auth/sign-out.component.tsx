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
import { logout, setLoading } from "../../actions";
import LogoutWithGoogle from "./platformSpecific/LogoutWithGoogle";
import { Button } from "@ui-kitten/components";
import { IInitialState } from "../../reducers/interfaces";
import { SignoutScreenScreenProps } from "../../navigation/auth.navigator";
import { AppRoute } from "../../navigation/app-routes";
import { ButtonInput } from "../../components/form-button.component";

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
  isLoading: boolean;
};

/**
 * Interface actions
 * for the component
 */
interface IActions extends SignoutScreenScreenProps {
  logout: (body: object) => void;
  setLoading: () => void;
}

const SignoutScreen = (props: IProps & IActions) => {
  /**
   * Logs out the user from their current
   * session
   */
  const submit = () => {
    props.setLoading();
    const { token } = props;

    props.logout({ token });
  };

  const { name, authedWithGoogle, isLoading } = props;

  return (
    <SafeAreaView style={styles.formContainer}>
      <Text style={styles.title}>Welcome, {name}</Text>

      {authedWithGoogle ? (
        <LogoutWithGoogle />
      ) : (
        <ButtonInput
          style={styles.formButton}
          onPress={submit}
          disabled={false}
          loading={isLoading}
          text="SIGNOUT"
        />
      )}

      <ButtonInput
        style={styles.formButton}
        onPress={() => props.navigation.navigate(AppRoute.HOME)}
        disabled={false}
        loading={false}
        text="HOME"
      />
    </SafeAreaView>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { name, token, authedWithGoogle, isLoading } = state;

  return {
    name,
    token,
    authedWithGoogle,
    isLoading,
  };
};

export default connect<IProps, IActions>(mapStateToProps, {
  logout,
  setLoading,
})(SignoutScreen);
