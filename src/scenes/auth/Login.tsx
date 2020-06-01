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
import { Formik, FormikProps } from 'formik';
import Register from "./Register";
import { Button, Layout, Icon } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as actions from "../../actions";
import Signout from "./Signout";
import { FormInput } from '../../components/form-input.component';
// import { EyeIcon, EyeOffIcon } from '../../assets/icons';
import { IInitialState } from "../../reducers/interfaces";
import LoginWithGoogle from "./platformSpecific/LoginWithGoogle";
import LoginWithApple from "./platformSpecific/LoginWithApple.ios";
import { SignInData, SignInSchema } from '../../data/sign-in.model';
import Constants from 'expo-constants'

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
  navigation?: any;
}

interface ILoginActions {
  isRegistering: () => void;
  formUpdate: ({ prop, value }: any) => void;
  login: (body: object) => void;
  loginWithThirdParty: (token: object) => void;
}

interface ISignInData extends SignInData {
  formUpdate: ({ prop, value }: any) => void;
}

interface ILoginState {
  errors: any[]
}


const Login = (props: ILoginProps & ILoginActions) => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);


  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  const submit = () => {
    if (canSubmit()) {
      const { email, password } = props;
      props.login({ email, password });
    }
  };

  /**
   * Validate the inputted details before
   * allowing the user to submit
   */
  const canSubmit = (): boolean => {
    const { email, password } = props;
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

    setErrors(errors)

    return errors.length > 0 ? false : true;
  };

  const renderPasswordIcon = (props: any): React.ReactElement => {
    // const IconComponent = passwordVisible ? EyeIcon : EyeOffIcon;
    const name = passwordVisible ? 'eye-outline' : 'eye-off-outline'
    return (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        {/* <Icon
          {...props}
          name="eye-outline"
        /> */}
        <Text>{name} icon</Text>
      </TouchableWithoutFeedback>
    );
  };

  const renderForm = (props: FormikProps<ISignInData>): React.ReactFragment => (
    <React.Fragment>
      <FormInput
        id='email'
        style={styles.formControl}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize="none"
        onChangeText={(value) =>
         props.formUpdate({ prop: "email", value })
        }
      />
      <FormInput
        id='password'
        style={styles.formControl}
        placeholder='Password'
        secureTextEntry={!passwordVisible}
        accessoryRight={renderPasswordIcon}
        onChangeText={(value) =>
          props.formUpdate({ prop: "email", value })
        }
      />
      <View style={styles.resetPasswordContainer}>
        <Button
          appearance='ghost'
          status='basic'>
          Forgot password?
        </Button>
      </View>
      <Button
        style={styles.submitButton}
        onPress={() => props.handleSubmit}>
        SIGN IN
      </Button>
    </React.Fragment>
  );


  // render() {
    const { email, password, toRegister, token } = props;

    if(token !== "") return <Signout />
    if (toRegister) return <Register />
    return (
  
      <Layout style={styles.formContainer}>
        <Formik
          initialValues={{email, password}}
          validationSchema={SignInSchema}
          onSubmit={submit}>
          {renderForm}
        </Formik>

        {/* <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          value={email}
          onChangeText={(value) =>
            this.props.formUpdate({ prop: "email", value })
          }
        /> */}
        {
          Platform.OS === "ios"
          && <LoginWithApple />
        }
            <LoginWithGoogle />

        <Text>Server URL - {Constants.manifest.extra.SERVER_URL}</Text>
        {errors.length > 0 && (
          <View>
            <Text>Please correct the following:</Text>
            {errors.map((dat, i) => {
              return <Text key={i}>{dat}</Text>;
            })}
          </View>
        )}

        <Button
          style={styles.noAccountButton}
          appearance='ghost'
          status='basic'
          onPress={() => props.isRegistering()}
          >
          Don't have an account?  
        </Button>

        <Button
          style={styles.noAccountButton}
          appearance='ghost'
          status='basic'
          onPress={() => props.navigation.navigate('Main')}
          >
          Close
        </Button>
      </Layout>
    );
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
