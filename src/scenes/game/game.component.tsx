/*
 * File: game.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 5th June 2020 11:54:27 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: In game controller during a game
 * Last Modified: Friday, 5th June 2020 11:54:36 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { Layout, Text } from "@ui-kitten/components"
import PickedPlayers from "../../components/picked-players.component";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import QuestionInput from "../../components/question-input.component";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

/**
 * Interface for props being
 * passed to to the game screen component
 */
interface IProps {
    pickedPlayers: IPlayer[];
}

const GameScreen = (props: IProps) => {
    
    return (
        <Layout style={styles.container}>
            <Text>Game Screen</Text>
            <PickedPlayers players={props.pickedPlayers} />
            <QuestionInput />

        </Layout>
    )
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { pickedPlayers } = state.game;
  
    return {
      pickedPlayers,
    };
  };
  
  export default connect<IProps>(
    mapStateToProps
  )(GameScreen);
  
