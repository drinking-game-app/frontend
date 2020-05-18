/*
 * File: Login.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 14th May 2020 4:22:47 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Handles user login input & validation
 * Last Modified: Saturday, 16th May 2020 8:55:33 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */


import React, { Component } from "react";
import { Text, SafeAreaView, TextInput, View, Platform } from "react-native";
import { connect } from "react-redux";
import Register from "./Register";
import { TouchableOpacity, RectButton } from "react-native-gesture-handler";
import * as actions from "../../actions";
import Signout from "./Signout";
import { IInitialState } from "../../reducers/interfaces";
import GoogleLogin from 'react-google-login';
import getEnvVars from '../../../environment';
import Expo from "expo"

/**
 * Get Google Client ID from environment variables
 */
const { IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID } = getEnvVars()

console.log('platform!!!', Platform.OS)

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
interface ILoginProps {
  email: string;
  password: string;
  error: string;
  toRegister: boolean;
  token: string;
}

interface ILoginActions {
  isRegistering: () => void;
  formUpdate: ({ prop, value }: any) => void;
  login: (body: object) => void;
  loginWithGoogle: (token: object) => void;
}

interface ILoginState {
  errors: any[]
}

class Login extends Component<ILoginProps & ILoginActions, ILoginState> {
  state = {
    errors: [],
  };

  /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  submit = () => {
    if (this.canSubmit()) {
      const { email, password } = this.props;
      this.props.login({ email, password });
    }
  };

  /**
   * Validate the inputted details before
   * allowing the user to submit
   */
  canSubmit = (): boolean => {
    const { email, password } = this.props;
    const user = {
      email,
      password,
    };

    const keys = Object.keys(user);
    const values = Object.values(user);

    let errors: any = [];

    values.map((dat, i) => {
      if (dat === "") errors.push(`${keys[i]} is required`);
    });

    this.setState({ errors: errors });

    return errors.length > 0 ? false : true;
  };

  /**
   * Handles a response from Google
   */
  responseGoogle = (res: any) => {
    if(res.error) {
      let errors: any = []
      errors.push(res.error)

      this.setState({ errors: errors });
    } else {
      this.props.loginWithGoogle({ token: res.tokenId });    
    }
  }

  signInWithGoogleMobile = async() => {
    try {
      const result = await Expo.Google.logInAsync({
        // androidClientId: "YOUR_CLIENT_ID_HERE",
        iosClientId: IOS_GOOGLE_CLIENT_ID,
        scopes: ["profile", "email"]
      })
      console.log('result!', result)
      if(result.type === "success") {
        console.log('success!')
      }
    } catch(err) {
      console.log('error!', err)
      let errors: any = []
      errors.push(err)

      this.setState({ errors: errors });
    }
  }

  render() {
    const { email, password, toRegister, token } = this.props;

    if(token !== "") return <Signout />
    if (toRegister) return <Register />
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          value={email}
          onChangeText={(value) =>
            this.props.formUpdate({ prop: "email", value })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          value={password}
          onChangeText={(value) =>
            this.props.formUpdate({ prop: "password", value })
          }
        />
        {
          Platform.OS === "web"
          ? (
            <GoogleLogin
              clientId={WEB_GOOGLE_CLIENT_ID}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          )
          :(
            <RectButton onPress={this.signInWithGoogleMobile} style={styles.formButton}>
              <Text>Login with Google</Text>
            </RectButton>
          )
        }

        <RectButton onPress={this.submit} style={styles.formButton}>
          <Text>Login</Text>
        </RectButton>

        {this.state.errors.length > 0 && (
          <View>
            <Text>Please correct the following:</Text>
            {this.state.errors.map((dat, i) => {
              return <Text key={i}>{dat}</Text>;
            })}
          </View>
        )}
        {this.props.error !== "" && <Text>{this.props.error}</Text>}
        <View>
          <Text>Don't have an Account?</Text>
          <TouchableOpacity onPress={() => this.props.isRegistering()}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}



/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): ILoginProps => {
  const { email, password, error, toRegister, token } = state;

  return {
    email,
    password,
    error,
    toRegister,
    token
  };
};

export default connect<ILoginProps, ILoginActions, {} > (mapStateToProps, actions)(Login);
