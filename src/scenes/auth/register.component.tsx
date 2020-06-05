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

import React from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { Button, Layout } from "@ui-kitten/components";
import { Formik, FormikProps } from "formik";
import { SignUpSchema, SignUpData } from "../../data/sign-up.model";
import { FormInput } from "../../components/form-input.component";
import { EyeIcon, EyeOffIcon } from "../../assets/icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AppRoute } from "../../navigation/app-routes";
import { RegisterScreenProps } from "../../navigation/auth.navigator";
import { ButtonInput } from "../../components/form-button.component";
import { Text } from "react-native";

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
  isLoading: boolean;
};

/**
 * Interface actions
 * for the component
 */
interface IActions extends RegisterScreenProps {
  setLoading: () => void;
  formUpdate: ({ prop, value }: any) => void;
  create: (body: object) => void;
}

const RegisterScreen = (props: IProps & IActions) => {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateSignIn = (): void => {
    props.navigation.navigate(AppRoute.SIGN_IN);
  };

  /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  const submit = (values: any) => {
    props.setLoading();
    const { name, email, password } = values;

    props.create({ name, email, password });
  };

  const renderPasswordIcon = (props: any): React.ReactElement => {
    const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;

    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        <IconComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };

  const { name, email, password, confirm_password, error, isLoading } = props;

  const renderForm = (props: FormikProps<SignUpData>): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;
    
    if(isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
    return (
      <React.Fragment>
        <FormInput
          id="name"
          style={styles.formControl}
          placeholder="Username"
          autoCorrect={false}
          autoCapitalize="none"
        />
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
        <FormInput
          id="confirm_password"
          style={styles.formControl}
          placeholder="Confirm Passwordd"
          secureTextEntry={!passwordVisible}
          accessoryRight={renderPasswordIcon}
        />
        {error !== "" && <Text>{error}</Text>}

        <ButtonInput
          style={styles.submitButton}
          disabled={!props.isValid && !props.isValidating}
          onPress={() => props.handleSubmit()}
          loading={loading}
          text="REGISTER"
        />
      </React.Fragment>
    );
  };

  if (props.actionSuccess) navigateSignIn();
  return (
    <Layout style={styles.formContainer}>
      <Formik
        initialValues={{ name, email, password, confirm_password }}
        validationSchema={SignUpSchema}
        onSubmit={(values) => submit(values)}
      >
        {renderForm}
      </Formik>

      <Button
        style={styles.noAccountButton}
        appearance="ghost"
        status="basic"
        onPress={() => props.navigation.navigate(AppRoute.SIGN_IN)}
      >
        Already have an account?
      </Button>
    </Layout>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: any) => {
  const { name, email, password, confirm_password, error, isLoading, actionSuccess } = state.auth;

  return {
    name,
    email,
    password,
    confirm_password,
    error,
    isLoading,
    actionSuccess
  };
};

export default connect<IProps & IActions, {}>(mapStateToProps, actions)(RegisterScreen);
