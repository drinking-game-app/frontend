import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from "react-redux";
import { loginWithThirdParty } from "../../../actions/auth";
import * as AppleAuthentication from 'expo-apple-authentication';


/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../../themes")("Form");

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
          const result: any = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          })
          
          const fullName = result.fullName.givenName + " " + result.fullName.familyName
          
          const user = {
            email: result.email,
            name: fullName,
            identityToken: result.identityToken
          }
       
          this.props.loginWithThirdParty({ token: result.authorizationCode, type: Platform.OS, provider: 'apple', user });    
        } catch(err) {
          console.log('error!', err)
        
          this.setState({ error: err.message });
        }
      }

      render() {
          return (
            <View style={styles.thirdPartyButtonContainer}>
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 44 }}
                onPress={this.signInWithAppleMobile}
              />

                {this.state.error !== ''
                    && <Text style={{textAlign: 'center'}}>Error: {this.state.error}</Text>
                }
            </View>
          )
      }
}

export default connect<ILoginWithAppleActions>(null, {loginWithThirdParty})(LoginWithApple)

