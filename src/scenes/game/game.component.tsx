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
import shuffleQuestion from "../../helpers/shuffle-question.helper";
import LoadingComponent from "../../components/loading.component";
import { ModalHeaderLobby } from "../../components/modal-header-lobby.component";

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
  answerQuestion: (lobbyName: string, questionIndex: number, playerId: number) => void;
  setPhase: (phase: string) => void;
  endGame: () => void;
}

/**
 * Interface for props being
 * passed to to the game screen component
 */
interface IProps {
  lobbyName: string;
  phase: string;
  currentQuestionId: number;
  questions: Question[];
  roundOptions: RoundOptions | undefined;
  user: IPlayer
  canAnswer: boolean;
  displayAnswer: boolean;
  timer: number;
}

const GameScreen = (props: IProps & IActions) => {
  const [serverHasQuestions, setServerHasQuestions] = useState<boolean>(false)
  const [notEnoughQuestions, setNotEnoughQuestions] = useState<boolean>(false)

  useEffect(() => {
      setNotEnoughQuestions((val) => false)

      onRequestQuestions(() => {
        console.log('requesting questions')
        setServerHasQuestions((oldBool) => {
          return true
        })
        const {questions} = props
        if(questions.length < props.roundOptions!.numQuestions) {
          setNotEnoughQuestions((val) => true)
          for(let i=props.roundOptions!.numQuestions -questions.length;i--;){
            questions.push({playerId: props.user.id, question: shuffleQuestion()})
          }
        }
        return questions.map(question => question.question)
      })
  })

  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const answerQuestion = (questionIndex: number, playerId: number) => {
    props.answerQuestion(props.lobbyName, questionIndex, playerId);
  };

  const gamePhaseController = () => {
    const userIsInHotseat = props.roundOptions?.hotseatPlayers.some(player => player.id === props.user.id)
    switch (props.phase) {
      case "Question Gathering":

        return (
          <React.Fragment>
            {/* <Timer serverHasQuestions={serverHasQuestions} /> */}
            <PickedPlayers user={props.user} players={props.roundOptions?.hotseatPlayers} />
            {notEnoughQuestions ? <Text>You didn't submit enough questions, generating some for you...</Text> : <></>}
            {!userIsInHotseat ? <QuestionInput /> : <Text>Waiting for other players to write some good quesitions...</Text>}
          </React.Fragment>
        );
      case "Hotseat":
        if(props.displayAnswer && props.questions && props.questions.length > 0) {          
          return (
            <React.Fragment>
                <Text>Question: {props.questions[props.currentQuestionId].question}</Text>
                {props.questions[props.currentQuestionId].answers.map((answer: number, i: number) => {
                  if(answer !== null) return <Text key={i}>{`${props.roundOptions?.hotseatPlayers[i].name} selected ${answer === i ? 'themself' : props.roundOptions?.hotseatPlayers[i === 0 ? 1 : 0].name}`}</Text>
                  return <Text key={i}>{`${props.roundOptions?.hotseatPlayers[i].name} didn't answer`}</Text>
                })}
            </React.Fragment>
          )
        }

        return (
          <PickedPlayers
            user={props.user}
            players={props.roundOptions?.hotseatPlayers}
            question={props.questions[props.currentQuestionId]}
            questionIndex={props.currentQuestionId}
            answerQuestion={answerQuestion}
            canAnswer={props.canAnswer}
          />
        );
      case "Disconnected":
        return <Text>Disconnected</Text>;

      default:
        return <LoadingComponent />
    }
  };

  return (
    <Layout style={styles.container}>
      <ModalHeaderLobby
        text={props.phase}
        lobbyCode={props.timer !== 0 ? `${props.timer}` : ""}
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
  const { timer, user, phase, currentQuestionId, questions, roundOptions, lobbyName, canAnswer, displayAnswer } = state.game;

  return {
    timer,
    user,
    phase,
    currentQuestionId,
    questions,
    roundOptions,
    lobbyName,
    canAnswer,
    displayAnswer
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(GameScreen);
