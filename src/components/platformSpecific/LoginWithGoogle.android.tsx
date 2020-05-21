import React, { Component } from "react";
import getEnvVars from '../../../environment';
import { View, Text, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loginWithGoogle } from "../../actions";
import * as Google from 'expo-google-app-auth';

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Form");

/**
 * Get Google Cliennt ID from environment variables
 */
const { ANDROID_GOOGLE_CLIENT_ID } = getEnvVars()

/**
 * Interface actions 
 * for the component
 */
interface ILoginWithGoogleActions {
  loginWithGoogle: (token: object) => void;
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
  androidClientId?: string;
}

class LoginWithGoogle extends Component <ILoginWithGoogleActions, ILoginWithGoogleState> {
    state = {
      error: ''
    }

    /**
     * Login with Google function
     * Asynconously logs the user on an 
     * android device
     */
    signInWithGoogleMobile = async() => {
      const payload: ILoginWithGooglePayload = {
        androidClientId: ANDROID_GOOGLE_CLIENT_ID
      }
          
      try {
          const result = await Google.logInAsync(payload)
          if(result.type === "success") {
            console.log('token!', result)
            this.props.loginWithGoogle({ token: result.idToken, accessToken: result.accessToken, type: Platform.OS });    
          }
        } catch(err) {
          console.log('error!', err)
        
          this.setState({ error: err.message });
        }
      }

      render() {
          return (
            <View>
              <RectButton onPress={this.signInWithGoogleMobile} style={styles.formButton}>
                <Text>Login with Google android</Text>
              </RectButton>
              {this.state.error !== ''
                    && <Text>Error: {this.state.error}</Text>
                }
            </View>
          )
      }
}

export default connect<ILoginWithGoogleActions>(null, {loginWithGoogle})(LoginWithGoogle)

