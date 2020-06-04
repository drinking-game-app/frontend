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
import GoogleLogout from 'react-google-login';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import {logout} from "../../../actions/auth";

/**
 * Get Google Client ID from environment variables
 */
import Constants from "expo-constants";
import { IInitialState } from "../../../reducers/interfaces";
const WEB_GOOGLE_CLIENT_ID = Constants.manifest.extra.WEB_GOOGLE_CLIENT_ID

/**
 * Interface actions 
 * for the component
 */
interface ILogoutWithGoogleActions {
    logout: (body: object) => void;
}

interface ILogoutWithGoogleState {
    error: string;
}

/**
 * Interface Props
 * for the component
 */
type IProps = {
    token: string;
};

class LogoutWithGoogle extends Component <IProps & ILogoutWithGoogleActions, ILogoutWithGoogleState> {
    state = {
        error: ''
    }

    /**
     * Handles a response from Google
     */
    responseGoogle = (res: any) => {
        if(res.error) {
            this.setState({ error: res.error });
        } else {
            const {token} = this.props

            this.props.logout({ token });
        }
    }

    render() {
        return (
            <View>
                <GoogleLogout
                    clientId={WEB_GOOGLE_CLIENT_ID}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    buttonText="Logout"
                />
    
                {this.state.error !== ''
                    && <Text>Error: {this.state.error}</Text>
                }
            </View>
        )
    }
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState) => {
  const { token } = state.auth;

  return {
    token,
  };
};

export default connect<IProps, ILogoutWithGoogleActions>(mapStateToProps,{logout})(LogoutWithGoogle)