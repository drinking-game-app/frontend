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

import React, { useEffect, useState } from "react";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import PickedPlayers from "../../components/picked-players.component";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import QuestionInput from "../../components/question-input.component";
import { gameActions } from "../../actions";
import { ModalHeader } from "../../components/modal-header.component";
import { GameScreenProps } from "../../navigation/game.navigator";
import { AppRoute } from "../../navigation/app-routes";
import { View } from "react-native";
import { onRequestQuestions, Question, RoundOptions } from "@rossmacd/gamesock-client";
import Timer from "../../components/timer.component";
import { userInfo } from "os";

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
  answerQuestion: ({ question }: Question) => void;
  setPhase: (phase: string) => void;
  endGame: () => void;
}

/**
 * Interface for props being
 * passed to to the game screen component
 */
interface IProps {
  // pickedPlayers: IPlayer[];
  phase: string;
  currentQuestionId: number;
  questions: Question[];
  roundOptions: RoundOptions | undefined;
  user: IPlayer
}

const GameScreen = (props: IProps & IActions) => {
  const [serverHasQuestions, setServerHasQuestions] = useState<boolean>(false)
    
  useEffect(() => {
      onRequestQuestions(() => {
        console.log('requesting questions')
        setServerHasQuestions((oldBool) => {
          return true
        })
        return props.questions.map(question => question.question)
      })
  })

  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const answerQuestion = (question: Question) => {
    props.answerQuestion(question);
  };

  const gamePhaseController = () => {
    const userIsInHotseat = props.roundOptions?.hotseatPlayers.some(player => player.id === props.user.id)
    switch (props.phase) {
      case "Question Gathering":

        return (
          <React.Fragment>
            <Timer serverHasQuestions={serverHasQuestions} />
            <PickedPlayers players={props.roundOptions?.hotseatPlayers} />
            {!userIsInHotseat ? <QuestionInput /> : <Text>Waiting for other players to write some good quesitions...</Text>}
          </React.Fragment>
        );
      case "Hotseat":
        return (
          <PickedPlayers
            players={props.roundOptions?.hotseatPlayers}
            question={props.questions[props.currentQuestionId]}
            answerQuestion={answerQuestion}
          />
        );
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

  return (
    <Layout style={styles.container}>
      <ModalHeader
        text={props.phase}
        icon="close-outline"
        status="danger"
        onPress={() => endGame()}
      />
      
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
  const { user, phase, currentQuestionId, questions, roundOptions } = state.game;

  return {
    user,
    phase,
    currentQuestionId,
    questions,
    roundOptions
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(GameScreen);
