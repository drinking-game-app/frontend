import React, { Component } from "react";
import { Text, SafeAreaView, TextInput, View } from "react-native";
import { connect } from "react-redux";
import { login, isRegistering } from "../../actions";
import Register from "./Register";
import { TouchableOpacity, RectButton } from "react-native-gesture-handler";
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
  email: string;
  password: string;
  error: string;
  toRegister: boolean;
  isRegistering: () => void;
  formUpdate: ({ prop, value }: any) => void;
  login: (body: object) => void;
};

class Login extends Component<IProps> {
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

  render() {
    const { email, password, toRegister } = this.props;

    if (toRegister) return <Register />;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}></Text>
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
const mapStateToProps = (state: any) => {
  const { email, password, error, toRegister } = state;

  return {
    email,
    password,
    error,
    toRegister
  };
};

export default connect(mapStateToProps, actions)(Login);
