/*
 * File: question-input.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 5th June 2020 11:13:02 am
 * Author: Ross MacDonald
 * ---------------
 * File Description: Component filling out questions in game
 * Last Modified: Friday, 5th June 2020 11:13:07 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { Layout, Button, IconProps, Icon, Text } from "@ui-kitten/components";
import React from "react";
import { Formik, FormikProps } from "formik";
import { QuestionSchema, QuestionInputData } from "../data/question-input.model";
import { FormInput } from "./form-input.component";
import { IInitialState, IPlayer } from "../reducers/interfaces";
import { gameActions } from "../actions";
import { connect } from "react-redux";
import { ButtonInput } from "./form-button.component";
import { View, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Question, RoundOptions } from "@rossmacd/gamesock-client";
import shuffleQuestion from "../helpers/shuffle-question.helper";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/**
 * Importing styles
 * @param theme path
 * @param Form Module name
 */
const styles = require("../themes")("Game");

/**
 * Interface actions
 * for the component
 */
interface IActions {
  setGameLoading: () => void;
  inputQuestion: ({ question }: Question) => void;
}

/**
 * Interface Props
 * for the component
 */
interface IProps {
  isLoading: boolean;
  questionInput: string;
  questions: Question[];
  user: IPlayer;
  roundOptions: RoundOptions;
}

const QuesionInput = (props: IProps & IActions) => {
  const submit = (values: { questionInput: string }) => {
    console.log("submitting!!!");
    props.setGameLoading();

    const question: Question = {
      playerId: props.user.id,
      question: values.questionInput,
    };

    props.inputQuestion(question);
  };

  const renderShuffleIcon = (props: IconProps): React.ReactElement => (
    <Icon {...props} name="shuffle-2-outline" />
  );

  const { isLoading, questionInput, roundOptions, questions } = props;

  const renderForm = (
    props: FormikProps<QuestionInputData>
  ): React.ReactFragment => {
    const loading = isLoading || props.isSubmitting;

    if (isLoading === false && props.isSubmitting === true)
      props.setSubmitting(false);
    if (roundOptions.numQuestions <= questions.length)
      return (
        <Text style={styles.inputTitle}>Waiting for other players...</Text>
      );
    return (
      <View style={styles.questionInputContainer}>
        {/* // <KeyboardAwareScrollView
            //     style={{ backgroundColor: '#4c69a5' }}
            //     resetScrollToCoords={{ x: 0, y: 0 }}
            //     contentContainerStyle={styles.questionInputContainer}
            //     // scrollEnabled={false}
            // > */}
        

        <Button
          accessoryLeft={renderShuffleIcon}
          onPress={() => {
            props.setValues({ questionInput: shuffleQuestion() });
          }}
          status="info"
          disabled={loading}
          style={styles.questionInputButton}
        />
        <FormInput
          id="questionInput"
          style={styles.questionInput}
          size="large"
          placeholder="Insert your question"
          value={props.values.questionInput}
          onSubmitEditing={() => Platform.OS !== 'web' ? props.handleSubmit() : () => {}}
          onKeyPress={({nativeEvent}) => {
            if(nativeEvent.key === 'Enter') props.handleSubmit()
          }}
        />
        <ButtonInput
          icon="checkmark-outline"
          disabled={loading}
          loading={loading}
          text=""
          onPress={() => props.handleSubmit()}
          status="success"
          style={styles.questionInputButton}
        />

        {/* // </KeyboardAvoidingView> */}
        {/* </KeyboardAwareScrollView> */}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.inputContainer}
    >
    <TouchableWithoutFeedback 
      onPress={Platform.OS !== 'web' ? Keyboard.dismiss : () => {}}
    >
      <Text style={{color: "#D7D98B"}}>
        No. of your <Text style={{color: '#AD0D4B'}}>Questions</Text>: {props.questions.length} /{" "}
        {props.roundOptions.numQuestions}
      </Text>
      <Formik
        initialValues={{ questionInput: questionInput }}
        validationSchema={QuestionSchema}
        onSubmit={(values, actions) => {
          submit(values);
          actions.setValues({ questionInput: questionInput });
        }}
      >
        {renderForm}
      </Formik>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const {
    isLoading,
    questionInput,
    questions,
    user,
    roundOptions
  } = state.game;

  return {
    isLoading,
    questionInput,
    questions,
    user,
    roundOptions,
  };
};

export default connect<IProps, IActions, {}>(
  mapStateToProps,
  gameActions
)(QuesionInput);
