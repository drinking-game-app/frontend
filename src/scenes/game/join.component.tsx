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
import { JoinGameScreenProps } from "../../navigation/game.navigator";
import { Layout, Button, Text } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import {gameActions} from "../../actions";
import { FormikProps, Formik } from "formik";
import { JoinLobbyData, JoinLobbySchema } from "../../data/join-lobby.model";
import { IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { FormInput } from "../../components/form-input.component";
import { ButtonInput } from "../../components/form-button.component";
import { IHostGame } from "../../actions/game";
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
interface IJoinActions extends JoinGameScreenProps {
    setGameLoading: () => void;
    formUpdate: ({ prop, value }: any) => void;
    joinGame:(body: IHostGame) => void;
  }
interface IJoinProps{
    username:string;
    lobbyName:string;
    error: string;
    isLoading: boolean;
}

const JoinScreen = (props: IJoinActions & IJoinProps) => {
    const {username,lobbyName,error,isLoading}=props;
    /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  const submit = (values: any) => {
    props.setGameLoading();
    const { lobbyName,username } = values;

    props.joinGame({lobbyName,username})
};
const renderForm = (props: FormikProps<JoinLobbyData>): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;

    if(isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
    return (
      <React.Fragment>
        <FormInput
          id="lobbyName"
          style={styles.formControl}
          placeholder="Join Code"
          autoCapitalize="none"
        />
        <FormInput
          id="username"
          style={styles.formControl}
          placeholder="Username"
        />
        

        {error !== "" && <Text>{error}</Text>}

        

        <ButtonInput
          style={styles.submitButton}
          disabled={!props.isValid && !props.isValidating}
          onPress={() => props.handleSubmit()}
          loading={loading}
          text="Join Game"
        />
      </React.Fragment>
    );
  };

    return (
        <Layout style={styles.formContainer}>
          <ModalHeader
              text="Join a lobby"
              icon="close-outline"
              status="danger"
              onPress={() => props.navigation.navigate(AppRoute.HOME)}
            />
            <Formik
                initialValues={{lobbyName,username}}
                validationSchema={JoinLobbySchema}
                onSubmit={(values)=>submit(values)}
            >

                {renderForm}
            </Formik>
            
        </Layout>
    )
}

const mapStateToProps = (state: IInitialState): IJoinProps => {
    const { lobbyName, username,error,isLoading } = state.game;
  
    return {
      lobbyName,
      username,
      error,
      isLoading
    };
  };
  
  export default connect<IJoinProps, IJoinActions, {}>(
    mapStateToProps,
    gameActions
  )(JoinScreen);