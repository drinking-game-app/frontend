/*
 * File: LoginWithGoogle.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Tuesday, 19th May 2020 5:18:52 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Login With Google Web only
 * Last Modified: Tuesday, 19th May 2020 5:19:18 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */




import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import { Text, View } from "react-native";
import { connect } from "react-redux";
import {loginWithThirdParty} from "../../actions";

/**
 * Get Google Client ID from environment variables
 */
import Constants from "expo-constants";
const WEB_GOOGLE_CLIENT_ID = Constants.manifest.extra.WEB_GOOGLE_CLIENT_ID


/**
 * Interface actions 
 * for the component
 */
interface ILoginWithGoogleActions {
    loginWithThirdParty: (token: object) => void;
}

interface ILoginWithGoogleState {
    error: string;
}

class LoginWithGoogle extends Component <ILoginWithGoogleActions, ILoginWithGoogleState> {
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
            this.props.loginWithThirdParty({ token: res.tokenId, provider: 'google' });    
        }
    }

    render() {
        return (
            <View>
                <GoogleLogin
                    clientId={WEB_GOOGLE_CLIENT_ID}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                {this.state.error !== ''
                    && <Text>Error: {this.state.error}</Text>
                }
            </View>
        )
    }
}

export default connect<ILoginWithGoogleActions>(null, {loginWithThirdParty})(LoginWithGoogle)