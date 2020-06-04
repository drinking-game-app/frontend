import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loginWithThirdParty } from "../../../actions/auth";
import * as Google from 'expo-google-app-auth';

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../../themes")("Form");

/**
 * Get Google Cliennt ID from environment variables
 */
import Constants from "expo-constants";
import { Button } from "@ui-kitten/components";

/**
 * Interface actions 
 * for the component
 */
interface ILoginWithGoogleActions {
  loginWithThirdParty: (token: object) => void;
}

/**
 * Interface for the component
 * state
 */
interface ILoginWithGoogleState {
  error: string;
}

/**
 * Interface for the Google logInAsync
 * payload
 */
interface ILoginWithGooglePayload {
  iosClientId?: string;
  iosStandaloneAppClientId?: string;
}

class LoginWithGoogle extends Component <ILoginWithGoogleActions, ILoginWithGoogleState> {
    state = {
      error: ''
    }

    /**
     * Login with Google function
     * Asynconously logs the user in on an 
     * iOS device
     */
    signInWithGoogleMobile = async() => {
      const payload: ILoginWithGooglePayload = {
        iosClientId: Constants.manifest.extra.DEV_IOS_GOOGLE_CLIENT_ID,
        iosStandaloneAppClientId: Constants.manifest.extra.PROD_IOS_GOOGLE_CLIENT_ID
      }

      try {
          const result = await Google.logInAsync(payload)

          if(result.type === "success") {
            console.log('token!', result)
            this.props.loginWithThirdParty({ token: result.idToken, accessToken: result.accessToken, type: Platform.OS, provider: 'google' });    
          }
        } catch(err) {
          console.log('error!', err)
        
          this.setState({ error: err.message });
        }
      }

      render() {
          return (
            <View>
              <Button onPress={this.signInWithGoogleMobile} style={styles.submitButton} status="basic">
                Login with Google
              </Button>
              {this.state.error !== ''
                    && <Text>Error: {this.state.error}</Text>
                }
            </View>
          )
      }
}

export default connect<ILoginWithGoogleActions>(null, {loginWithThirdParty})(LoginWithGoogle)

