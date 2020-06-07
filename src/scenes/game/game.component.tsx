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
import { Layout, Text, Spinner, Button } from "@ui-kitten/components";
import PickedPlayers from "../../components/picked-players.component";
import { IPlayer, IInitialState, IQuestion } from "../../reducers/interfaces";
import { connect } from "react-redux";
import QuestionInput from "../../components/question-input.component";
import { gameActions } from "../../actions";
import { ModalHeader } from "../../components/modal-header.component";
import { GameScreenProps } from "../../navigation/game.navigator";
import { AppRoute } from "../../navigation/app-routes";
import { View } from "react-native";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

/**
 * Interface for Actions being
 * passed to the game screen component
 */
interface IActions extends GameScreenProps {
  setGameLoading: () => void;
  leaveGame: () => void;
  answerQuestion: ({ question }: IQuestion) => void;
  setPhase: (phase: string) => void;
  endGame: () => void;
}

/**
 * Interface for props being
 * passed to to the game screen component
 */
interface IProps {
  pickedPlayers: IPlayer[];
  phase: string;
  currentQuestion: IQuestion;
}

const phases = ["", "Question Gathering", "Hotseat", "Leaderboard", "Disconnected"];

const GameScreen = (props: IProps & IActions) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = React.useState<number>(0);
  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const answerQuestion = (question: IQuestion) => {
    props.answerQuestion(question);
  };

  const gamePhaseController = () => {
    // if(props.phase === 'Leaderboard') props.endGame()

    switch (props.phase) {
      case "Question Gathering":
        return (
          <React.Fragment>
            <PickedPlayers players={props.pickedPlayers} />
            <QuestionInput />
          </React.Fragment>
        );
      case "Hotseat":
        return (
          <PickedPlayers
            players={props.pickedPlayers}
            question={props.currentQuestion}
            answerQuestion={answerQuestion}
          />
        );
      // case "Leaderboard":
      //   return props.endGame()
      //   return <React.Fragment><Text>Leaderboard</Text><Button onPress={() => props.endGame()}>End Game</Button></React.Fragment>;
      case "Disconnected":
        return <Text>Disconnected</Text>;

      default:
        return (
          <View style={styles.gameLoadingSpinner}>
            <Spinner size="large" />
          </View>
        );
    }
  };

  /**
   * Cycle through the phases for dev purposes
   */
  const cyclePhase = () => {
    setCurrentPhaseIndex((oldPhaseIndex) => {
      const newPhaseIndex =
        oldPhaseIndex > phases.length - 1 ? 0 : (oldPhaseIndex += 1);

      props.setPhase(phases[newPhaseIndex]);
      return newPhaseIndex;
    });
  };

  return (
    <Layout style={styles.container}>
      <ModalHeader
        text="Game Screen"
        icon="close-outline"
        status="danger"
        onPress={() => endGame()}
      />
      <Text>
        Phase:{" "}
        {phases[currentPhaseIndex] === ""
          ? "Loading"
          : phases[currentPhaseIndex]}
      </Text>
      <Button onPress={() => cyclePhase()}>Next Phase</Button>
      {gamePhaseController()}
    </Layout>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { pickedPlayers, phase, currentQuestion } = state.game;

  return {
    pickedPlayers,
    phase,
    currentQuestion
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(GameScreen);
