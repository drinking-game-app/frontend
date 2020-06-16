/*
 * File: timer.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 8th June 2020 4:58:33 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Timer Component
 * Last Modified: Monday, 8th June 2020 4:58:53 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */
import React from 'react'
import { Text } from "@ui-kitten/components"
import { IInitialState } from "../reducers/interfaces";
import { connect } from "react-redux";


interface IProps {
    timer: number
    serverHasQuestions: boolean;
}

const Timer = (props: IProps) => {

    if(props.serverHasQuestions) return <Text>Time's up. Game Time!</Text>
    if(props.timer === 0) return <Text>Starting timer...</Text>
    return (
        <Text>{props.timer} secs left</Text>
    )
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): {timer: number} => {
    const { timer } = state.game;
  
    return {
      timer
    };
  };
  
  export default connect<IProps>(
    mapStateToProps,
    null
  )(Timer);