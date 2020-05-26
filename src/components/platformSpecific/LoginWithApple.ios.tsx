import React, { Component } from "react";
import getEnvVars from '../../../environment';
import { View, Text, Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { loginWithThirdParty } from "../../actions";
import * as AppleAuthentication from 'expo-apple-authentication';

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Form");

/**
 * Get Apple Cliennt ID from environment variables
 */
// const { IOS_GOOGLE_CLIENT_ID, ANDROID_GOOGLE_CLIENT_ID } = getEnvVars()

/**
 * Interface actions 
 * for the component
 */
interface ILoginWithAppleActions {
  loginWithThirdParty: (token: object) => void;
}

/**
 * Interface for the component
 * state
 */
interface ILoginWithAppleState {
  error: string;
}

/**
 * Interface for the Apple logInAsync
 * payload
 */
interface ILoginWithApplePayload {
  iosClientId?: string;
  androidClientId?: string;
}

class LoginWithApple extends Component <ILoginWithAppleActions, ILoginWithAppleState> {
    state = {
      error: ''
    }

    /**
     * Login with Apple function
     * Asynconously logs the user in on an 
     * iOS device
     */
    signInWithAppleMobile = async() => {

      try {
          const result = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          })

          
            console.log('token!', result)
            this.props.loginWithThirdParty({ token: result.authorizationCode, type: Platform.OS, provider: 'apple' });    
          // }
        } catch(err) {
          console.log('error!', err)
        
          this.setState({ error: err.message });
        }
      }

      render() {
          return (
            <View>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 44 }}
                onPress={this.signInWithAppleMobile}
              />

                {this.state.error !== ''
                    && <Text>Error: {this.state.error}</Text>
                }
            </View>
          )
      }
}

export default connect<ILoginWithAppleActions>(null, {loginWithThirdParty})(LoginWithApple)

