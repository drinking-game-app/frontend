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

import React from "react";
import { Text, View, Platform } from "react-native";
import { connect } from "react-redux";
import { Formik, FormikProps } from "formik";
import Register from "./Register";
import { Button, Layout, Icon } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as actions from "../../actions";
import Signout from "./Signout";
import { FormInput } from "../../components/form-input.component";
import { IInitialState } from "../../reducers/interfaces";
import LoginWithGoogle from "./platformSpecific/LoginWithGoogle";
import LoginWithApple from "./platformSpecific/LoginWithApple.ios";
import { SignInData, SignInSchema } from "../../data/sign-in.model";
import { EyeIcon, EyeOffIcon } from "../../assets/icons";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Form");

/**
 * Interface actions
 * for the component
 */
interface ILoginActions {
  isRegistering: () => void;
  formUpdate: ({ prop, value }: any) => void;
  login: (body: object) => void;
  loginWithThirdParty: (token: object) => void;
}

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
  navigation?: any;
}

const Login = (props: ILoginProps & ILoginActions) => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  const submit = (values: any) => {
    const { email, password } = values;

    props.login({ email, password });
  };

  const renderPasswordIcon = (props: any): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };

  const renderForm = (props: FormikProps<SignInData>): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id="email"
        style={styles.formControl}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormInput
        id="password"
        style={styles.formControl}
        placeholder="Password"
        secureTextEntry={!passwordVisible}
        accessoryRight={renderPasswordIcon}
      />
      <View style={styles.resetPasswordContainer}>
        <Button appearance="ghost" status="basic">
          Forgot password?
        </Button>
      </View>

      <Button
        style={styles.submitButton}
        disabled={!props.isValid && !props.isValidating}
        onPress={props.handleSubmit}
      >
        SIGN IN
      </Button>
    </React.Fragment>
  );

  const { email, password, toRegister, token } = props;

  if (token !== "") return <Signout />;
  if (toRegister) return <Register />;
  return (
    <Layout style={styles.formContainer}>
      <Formik
        initialValues={{ email, password }}
        validationSchema={SignInSchema}
        onSubmit={(values) => submit(values)}
      >
        {renderForm}
      </Formik>
      {Platform.OS === "ios" && <LoginWithApple />}

      <LoginWithGoogle />

      <Button
        style={styles.noAccountButton}
        appearance="ghost"
        status="basic"
        onPress={() => props.isRegistering()}
      >
        Don't have an account?
      </Button>

      <Button
        style={styles.noAccountButton}
        appearance="ghost"
        status="basic"
        onPress={() => props.navigation.navigate("Main")}
      >
        Close
      </Button>
    </Layout>
  );
};

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
    token,
  };
};

export default connect<ILoginProps, ILoginActions, {}>(
  mapStateToProps,
  actions
)(Login);
