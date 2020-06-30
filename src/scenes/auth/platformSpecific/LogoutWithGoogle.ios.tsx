/*
 * File: LogoutWithGoogle.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Tuesday, 19th May 2020 5:18:52 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Logout With Google Web only
 * Last Modified: Tuesday, 19th May 2020 5:19:18 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React, { Component } from "react";
import * as Google from "expo-google-app-auth";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

/**
 * Get Google Client ID from environment variables
 */

import manifest from './../../../variables.json'


import { IInitialState } from "../../../reducers/interfaces";
import { ButtonInput } from "../../../components/form-button.component";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../../themes")("App");


/**
 * Interface Props
 * for the component
 */
type IProps = {
  token: string;
  accessToken: string;
  isLoading: boolean;
};

/**
 * Interface actions
 * for the component
 */
interface ILogoutWithGoogleActions {
  logout: (body: object) => void;
}

/**
 * Interface for the component
 * state
 */
interface ILogoutWithGoogleState {
  error: string;
}

/**
 * Interface for the Google logOutAsync
 * payload
 */
interface ILogoutWithGooglePayload {
  iosClientId?: string;
  iosStandaloneAppClientId?: string;
  accessToken: string;
}

class LogoutWithGoogle extends Component<
  IProps & ILogoutWithGoogleActions,
  ILogoutWithGoogleState
> {
  state = {
    error: "",
  };

  /**
   * Logout with Google function
   * Asynconously logs the user out on either an
   * android of iOS device
   */
  logout = async () => {
    const { accessToken } = this.props;

    let payload: ILogoutWithGooglePayload = {
      accessToken,
      iosClientId: manifest.DEV_IOS_GOOGLE_CLIENT_ID,
      iosStandaloneAppClientId:
        manifest.PROD_IOS_GOOGLE_CLIENT_ID,
    };

    try {
      const result = await Google.logOutAsync(payload);

      const { token } = this.props;

      this.props.logout({ token, accessToken });
    } catch (err) {
      console.log("error!", err);

      this.setState({ error: err.message });
    }
  };

  render() {
    return (
        <ButtonInput
          style={styles.signOutBtn}
          onPress={this.logout}
          disabled={false}
          loading={this.props.isLoading}
          icon="log-out-outline"
          text=""
        />
    );
  }
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState) => {
  const { token, accessToken, isLoading } = state.auth;

  return {
    token,
    accessToken,
    isLoading
  };
};

export default connect<IProps, ILogoutWithGoogleActions>(mapStateToProps, {
  logout,
})(LogoutWithGoogle);
