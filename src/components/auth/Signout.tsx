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


import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../actions";
import { RectButton } from "react-native-gesture-handler";

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
  logout: (body: object) => void;
};

type IState = {

}

class Signout extends Component<IProps> {
  
  /**
   * Logs out the user from their current
   * session
   */
  submit = () => {
      const {token} = this.props

      this.props.logout({ token });
  };

  render() {
    const { name } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Welcome, {name}</Text>
       

        <RectButton onPress={this.submit} style={styles.formButton}>
          <Text>Signout</Text>
        </RectButton>
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
  const { name, token } = state;

  return {
    name,
    token
  };
};

export default connect(mapStateToProps, {logout})(Signout);
