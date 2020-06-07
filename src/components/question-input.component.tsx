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

import { Layout, Button, IconProps, Icon } from "@ui-kitten/components";
import React from "react";
import { Formik, FormikProps } from "formik";
import { QuestionSchema, QuestionInputData } from "../data/question-input.model";
import { FormInput } from "./form-input.component";
import { IInitialState } from "../reducers/interfaces";
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
    setLoading: () => void;
    submitQuestion: ({ question }: any) => void;
}

/**
 * Interface Props
 * for the component
 */
interface IProps {
    isLoading: boolean;
    questionInput: string;
}

const QuesionInput = (props: IProps & IActions) =>{

    const submit = (values: any) => {
        props.setLoading()
        const {question} = values

        props.submitQuestion({ question })
    }

    const renderShuffleIcon = (props: IconProps): React.ReactElement => (
        <Icon {...props} name="shuffle-2-outline" />
    )

    const renderSubmitIcon = (props: IconProps): React.ReactElement => (
        <Icon {...props} name="checkmark-outline" />
    )

    const shuffleQuestion = () => {
        console.log('shuffle question')
    }

    const {isLoading, questionInput} = props

    const renderForm = (props: FormikProps<QuestionInputData>): React.ReactFragment => {
        const loading = isLoading || props.isSubmitting;

        if(isLoading === false && props.isSubmitting === true) props.setSubmitting(false)
        return (
            <KeyboardAwareScrollView
            style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.questionInputContainer}
            // scrollEnabled={false}
          >
            {/* // <KeyboardAvoidingView behavior='padding' style={styles.questionInputContainer}> */}
                {/* <View style={styles.questionInputContainer}> */}
                    <Button
                        accessoryLeft={renderShuffleIcon}
                        onPress={() => shuffleQuestion}
                        status="danger"
                        disabled={loading}
                        style={styles.questionInputButton}
                    />
                    <FormInput
                        id="question"
                        style={[styles.questionInput]}
                        size="large"
                        placeholder="Insert your question"
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
                {/* </View> */}
                {/* // </KeyboardAvoidingView> */}
            </KeyboardAwareScrollView>
        )
    }

    return (
        <Layout>
            <Formik
                initialValues={{ questionInput }}
                validationSchema={QuestionSchema}
                onSubmit={(values) => submit(values)}
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
    const { isLoading, questionInput } = state.game;
  
    return {
        isLoading, questionInput
    };
  };
  
  export default connect<IProps, IActions, {}>(
    mapStateToProps,
    gameActions
  )(QuesionInput);
  