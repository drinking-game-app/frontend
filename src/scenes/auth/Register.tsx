/*
 * File: Register.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 14th May 2020 3:08:31 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Handles user registration input & validation
 * Last Modified: Saturday, 16th May 2020 8:56:06 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



import React, { Component } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  TextInput,
  RectButton,
} from "react-native-gesture-handler";
import * as actions from "../../actions";

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
  actionSuccess: boolean;
  canSubmit: boolean;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  error: string;
  isRegistering: () => void;
  formUpdate: ({ prop, value }: any) => void;
  create: (body: object) => void;
};

class Register extends Component<IProps> {
  state = {
    errors: [],
  };

  /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  submit = () => {
    if (this.canSubmit()) {
      const { name, email, password } = this.props;
      this.props.create({name, email, password})
    }
  };

  /**
   * Validate the inputted details before
   * allowing the user to submit
   */
  canSubmit = (): boolean => {
    const { name, email, password, confirm_password } = this.props;
    const user = {
      name,
      email,
      password,
      confirm_password,
    };

    const keys = Object.keys(user);
    const values = Object.values(user);

    let errors: any = [];

    values.map((dat, i) => {
      if (dat === "") errors.push(`${keys[i]} is required`);
      if(keys[i] === "password" && dat !== values[i + 1]) errors.push('password does not match confirm password')
    });

    this.setState({ errors: errors });

    return errors.length > 0 ? false : true;
  };

  render() {
    const { name, email, password, confirm_password } = this.props;
    
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Register page</Text>
        {this.props.actionSuccess ? (
          <Text>Registered Successfully!</Text>
        ) : (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Username"
              autoCapitalize="none"
              placeholderTextColor="white"
              value={name}
              onChangeText={(value) =>
                this.props.formUpdate({ prop: "name", value })
              }
            />
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="white"
              value={confirm_password}
              onChangeText={(value) =>
                this.props.formUpdate({ prop: "confirm_password", value })
              }
            />

            <RectButton onPress={this.submit} style={styles.formButton}>
              <Text>Register</Text>
            </RectButton>
            {this.state.errors.length > 0 && (
              <View>
                <Text>Please correct the following:</Text>
                {this.state.errors.map((dat, i) => {
                  return <Text key={i}>{dat}</Text>;
                })}
              </View>
            )}
            {
              this.props.error !== ""
              && <Text>{this.props.error}</Text>
            }
          </View>
        )}

        <View>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.isRegistering()}>
            <Text>Login</Text>
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
const mapStateToProps = (state: any) => {
  const { name, email, password, confirm_password, error } = state;

  return {
    name,
    email,
    password,
    confirm_password,
    error
  };
};

export default connect(mapStateToProps, actions)(Register);
