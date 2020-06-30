/*
 * File: join.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 3rd June 2020 2:52:35 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Joining a game
 * Last Modified: Wednesday, 3rd June 2020 3:14:57 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { View } from "react-native";
import { EditUserScreenProps } from "../../navigation/game.navigator";
import { Layout, Text } from "@ui-kitten/components";
import { gameActions } from "../../actions";
import { FormikProps, Formik } from "formik";
import { EditUserData, EditUserSchema } from "../../data/edit-user.model";
import { IInitialState, IPlayer } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { FormInput } from "../../components/form-input.component";
import { ButtonInput } from "../../components/form-button.component";
import { ModalHeader } from "../../components/modal-header.component";



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
interface IEditActions extends EditUserScreenProps {
  setGameLoading: () => void;
  formUpdate: ({ prop, value }: any) => void;
  updateSinglePlayer: (lobbyName: string, user: IPlayer) => void;
  toggleRedirect: () => void;
}
interface IEditProps {
  user: IPlayer;
  error: string;
  isLoading: boolean;
  lobbyName: string;
  shouldRedirect: boolean;
}

const EditUserScreen = (props: IEditActions & IEditProps) => {
  const { error, isLoading } = props;
  /**
 * If the inputs pass validation,
 * submit the request to the server
 */
  const submit = (values: any) => {
    props.setGameLoading();
    // setWaitForRedirect(true)

    const { lobbyName } = props
    let { user } = props
    const { username } = values;

    user.name = username

    console.log('sending update!', {lobbyName, user})

    props.updateSinglePlayer(lobbyName, user)
  };

  const renderForm = (props: FormikProps<EditUserData>): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;

    // if (isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
    return (
      <React.Fragment>
        <FormInput
          id="username"
          style={styles.formControl}
          size='large'
          value={props.values.username}
          placeholder="Enter a Username"
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Enter') props.handleSubmit()
          }}
        />

        {error !== "" && <Text>{error}</Text>}

        <ButtonInput
          style={styles.submitButton}
          disabled={!props.isValid && !props.isValidating}
          onPress={() => {
            props.handleSubmit()}
          }
          loading={loading}
          text="SAVE"
        />
      </React.Fragment>
    );
  };


  return (
    <Layout style={styles.formContainer}>
      <ModalHeader
        text=""
        icon="close-outline"
        status="primary"
        onPress={() => props.navigation.goBack()}
      />

      <View style={styles.formContainer}>
        <Formik
          initialValues={{ username: props.user.name || "" }}
          validationSchema={EditUserSchema}
          onSubmit={(values) => submit(values)}
        >

          {renderForm}
        </Formik>
      </View>
    </Layout>
  )
}

const mapStateToProps = (state: IInitialState): IEditProps => {
  const { error, isLoading, user, lobbyName, shouldRedirect } = state.game;

  return {
    error,
    isLoading,
    user,
    lobbyName,
    shouldRedirect
  };
};

export default connect<IEditProps, IEditActions, {}>(
  mapStateToProps,
  gameActions
)(EditUserScreen);