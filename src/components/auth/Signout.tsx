import React, { Component } from "react";
import { Text, SafeAreaView, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { logout } from "../../actions";
import Register from "./Register";
import { TouchableOpacity, RectButton } from "react-native-gesture-handler";

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
