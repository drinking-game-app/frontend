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
import { JoinGameScreenProps } from "../../navigation/game.navigator";
import { Layout, Text } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import {gameActions} from "../../actions";
import { FormikProps, Formik } from "formik";
import { JoinLobbyData, JoinLobbySchema } from "../../data/join-lobby.model";
import { IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { FormInput } from "../../components/form-input.component";
import { ButtonInput } from "../../components/form-button.component";
import { IJoinGame } from "../../actions/game";
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
    joinGame:(body: IJoinGame) => void;
  }
interface IJoinProps{
    name:string;
    lobbyName:string;
    error: string;
    isLoading: boolean;
}

const JoinScreen = (props: IJoinActions & IJoinProps) => {
    const {lobbyName,error,isLoading}=props;
    /**
   * If the inputs pass validation,
   * submit the request to the server
   */
  const submit = (values: any) => {
    props.setGameLoading();
    const { lobbyName,username } = values;
    
    props.joinGame({lobbyName: lobbyName.toUpperCase(), username})
};
const renderForm = (props: FormikProps<JoinLobbyData>): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;

    if(isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
    return (
      <React.Fragment>
        <FormInput
          id="lobbyName"
          style={styles.formControl}
          size='large'
          value={props.values.lobbyName}
          placeholder="Enter Join Code"
          autoCapitalize="characters"
          onKeyPress={({nativeEvent}) => {
            if(nativeEvent.key === 'Enter') props.handleSubmit()
          }}
        />

        <FormInput
          id="username"
          style={styles.formControl}
          size='large'
          value={props.values.username}
          placeholder="Create a Username"
          onKeyPress={({nativeEvent}) => {
            if(nativeEvent.key === 'Enter') props.handleSubmit()
          }}
        />
        
        {error !== "" && <Text>{error}</Text>}

        <ButtonInput
          style={styles.submitButton}
          disabled={!props.isValid && !props.isValidating}
          onPress={() => props.handleSubmit()}
          loading={loading}
          text="JOIN"
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
              onPress={() => props.navigation.navigate(AppRoute.HOME)}
            />

            <View style={styles.formContainer}>
              <Formik
                  initialValues={{lobbyName, username: props.name}}
                  validationSchema={JoinLobbySchema}
                  onSubmit={(values)=>submit(values)}
              >

                  {renderForm}
              </Formik>
            </View>
        </Layout>
    )
}

const mapStateToProps = (state: IInitialState): IJoinProps => {
    const { lobbyName,error,isLoading } = state.game;
    const {name} = state.auth

    return {
      lobbyName,
      error,
      isLoading,
      name
    };
  };
  
  export default connect<IJoinProps, IJoinActions, {}>(
    mapStateToProps,
    gameActions
  )(JoinScreen);