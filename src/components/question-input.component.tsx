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
import { IInitialState, IQuestion } from "../reducers/interfaces";
import {gameActions} from "../actions";
import { connect } from "react-redux";
import { ButtonInput } from "./form-button.component";
import { View, KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

/**
 * Importing styles
 * @param theme path
 * @param Form Module name
 */
const styles = require("../themes")("Form");

/**
 * Interface actions
 * for the component
 */
interface IActions {
    setGameLoading: () => void;
    inputQuestion: ({ question }: IQuestion) => void;
}

/**
 * Interface Props
 * for the component
 */
interface IProps {
    isLoading: boolean;
    questionInput: string;
    questions: IQuestion[];
    username: string;
    numOfQuestions: number;
}

const QuesionInput = (props: IProps & IActions) =>{

    const submit = (values: {questionInput: string}) => {
        console.log('submitting!!!')
        props.setGameLoading()
        
        const question: IQuestion = {
            username: props.username,
            question: values.questionInput
        }

        props.inputQuestion(question)
    }

    const renderShuffleIcon = (props: IconProps): React.ReactElement => (
        <Icon {...props} name="shuffle-2-outline" />
    )

    const shuffleQuestion = () => {
        console.log('shuffle question')
    }

    const {isLoading, questionInput} = props

    const renderForm = (props: FormikProps<QuestionInputData>): React.ReactFragment => {
        const loading = isLoading || props.isSubmitting;

        if(isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
        return (
            <View style={styles.questionInputContainer}>
            {/* // <KeyboardAwareScrollView
            //     style={{ backgroundColor: '#4c69a5' }}
            //     resetScrollToCoords={{ x: 0, y: 0 }}
            //     contentContainerStyle={styles.questionInputContainer}
            //     // scrollEnabled={false}
            // > */}
            {/* // <KeyboardAvoidingView behavior='padding' style={styles.questionInputContainer}> */}
                
                    <Button
                        accessoryLeft={renderShuffleIcon}
                        onPress={() => shuffleQuestion}
                        status="danger"
                        disabled={loading}
                        style={styles.questionInputButton}
                    />
                    <FormInput
                        id="questionInput"
                        style={[styles.questionInput]}
                        size="large"
                        placeholder="Insert your question"    
                        value={props.values.questionInput}         
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
        )
    }

    if(props.numOfQuestions <= props.questions.length) return (
        <Layout>
            <Text>Questions submitted! Waiting for other players...</Text>
        </Layout>
    )
    return (
        <Layout>
            <Text>Input your questions {props.questions.length} / {props.numOfQuestions}</Text>
            <Formik
                initialValues={{ questionInput: questionInput }}
                validationSchema={QuestionSchema}
                onSubmit={(values, actions) => {
                    submit(values)
                    actions.setValues({questionInput: questionInput})
                    
                }}
            >{renderForm}</Formik>
        </Layout>
    )
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { isLoading, questionInput, questions, username, numOfQuestions } = state.game;
  
    return {
        isLoading, questionInput, questions, username, numOfQuestions
    };
  };
  
  export default connect<IProps, IActions, {}>(
    mapStateToProps,
    gameActions
  )(QuesionInput);
  