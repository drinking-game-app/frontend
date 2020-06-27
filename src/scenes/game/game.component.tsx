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
import { Layout, Text } from "@ui-kitten/components";
import PickedPlayers from "../../components/picked-players.component";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import QuestionInput from "../../components/question-input.component";
import { gameActions } from "../../actions";
import { GameScreenProps } from "../../navigation/game.navigator";
import { AppRoute } from "../../navigation/app-routes";
import {
  onRequestQuestions,
  Question,
  RoundOptions,
  HotseatOptions,
} from "@rossmacd/gamesock-client";
import LoadingComponent from "../../components/loading.component";
import { ModalHeaderLobby } from "../../components/modal-header-lobby.component";
import {useKeepAwake} from 'expo-keep-awake';
import { ScrollView } from "react-native-gesture-handler";


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
  onNextQuestion: (time: number) => void;
  answerQuestion: (
    lobbyName: string,
    questionIndex: number,
    playerId: number,
    roundNum: number
  ) => void;
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
  user: IPlayer;
  canAnswer: boolean;
  displayAnswer: boolean;
  timer: number;
  hotseatOptions: HotseatOptions | undefined;
}

const GameScreen = (props: IProps & IActions) => {
  const [serverHasQuestions, setServerHasQuestions] = useState<boolean>(false);
  const [notEnoughQuestions, setNotEnoughQuestions] = useState<boolean>(false);
  useKeepAwake();

  useEffect(() => {
    setNotEnoughQuestions((val) => false);

    onRequestQuestions(() => {
      console.log("requesting questions");
      setServerHasQuestions((oldBool) => {
        return true;
      });

      const { questions } = props;

      // if (questions.length < props.roundOptions!.numQuestions) {
      //   setNotEnoughQuestions((val) => true);
      //   for (
      //     let i = props.roundOptions!.numQuestions - questions.length;
      //     i--;

      //   ) {
      //     questions.push({
      //       playerId: props.user.id,
      //       question: shuffleQuestion(),
      //     });
      //   }
      // }
      return questions.map((question) => question.question);
    });
  });

  // useEffect(() => {
  //   console.log("use effect siadgnewi", props.hotseatOptions);
  //   if (props.questions && props.questions.length > 0) {
  //     //@ts-ignore
  //     props.onNextQuestion(props.hotseatOptions?.delayBetween);
  //   }
  // }, [props.canAnswer]);

  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const answerQuestion = (questionIndex: number, playerId: number) => {
    props.answerQuestion(
      props.lobbyName,
      questionIndex,
      playerId,
      props.roundOptions?.roundNum as number
    );
  };

  const gamePhaseController = () => {
    const userIsInHotseat = props.roundOptions?.hotseatPlayers.some(
      (player) => player.id === props.user.id
    );

    switch (props.phase) {
      case "Question Gathering":
        return (
          <React.Fragment>
          <ScrollView style={{flex: 1}}>
            {/* <Timer serverHasQuestions={serverHasQuestions} /> */}
            <PickedPlayers
              user={props.user}
              players={props.roundOptions?.hotseatPlayers}
            />
          </ScrollView>
            {notEnoughQuestions ? (
              <Text style={styles.title}>
                Can't think of questions? That's okay, we'll help you out!
              </Text>
            ) : (
              <></>
            )}

            {!userIsInHotseat ? (
              <QuestionInput />
            ) : (
              // Text for chosen players for when they're waiting for questions:
              <Text style={styles.titleNotChosen}>
                Waiting to "destroy" your friendship...
              </Text>
            )}
          </React.Fragment>
        );

      case "Display Answer":
        // return (
        //   <React.Fragment>
        //     <Text style={styles.questInAnsPhase}>{props.questions[props.currentQuestionId].question}</Text>

        //     {props.questions[props.currentQuestionId].answers!.map(
        //       (answer: number, i: number) => {
        //         if (answer !== null)
        //           return (
        //             <Text key={i} style={[i === 0 ? styles.answerLeft : styles.answerRight]}>
        //               {`${props.roundOptions?.hotseatPlayers[i].name} SELECTED ${answer === i ? "THEMSELVES!" : props.roundOptions?.hotseatPlayers[i === 0 ? 1 : 0].name}`}
        //             </Text>
        //           );

        //         return (
        //           // Text for when chosen players didn't choose a player:
        //           <Text key={i} style={[styles.pleadTheFifth, i === 0 ? styles.pleadAlignLeft : styles.pleadAlignRight]}>
        //             {`${props.roundOptions?.hotseatPlayers[i].name} pleaded the 5th`}
        //           </Text>
        //         );
        //       }
        //     )}
        //   </React.Fragment>
        // );
      case "Hotseat":
        return (
          <PickedPlayers
            user={props.user}
            players={props.roundOptions?.hotseatPlayers}
            question={props.questions[props.currentQuestionId]}
            questionIndex={props.currentQuestionId}
            answerQuestion={answerQuestion}
            canAnswer={props.canAnswer}
            displayAnswer={props.phase === "Display Answer"}
          />
        );

      case "Disconnected":
        return <Text>Disconnected 😢</Text>;

      default:
        return <LoadingComponent />;
    }
  };

  return (
    <Layout style={styles.container}>
      <ModalHeaderLobby
        text={props.phase}
        loadingText={props.phase}
        lobbyCode={props.timer !== 0 ? `${props.timer}` : ""}
        icon="close-outline"
        status="info"
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
  const {
    timer,
    user,
    phase,
    currentQuestionId,
    questions,
    roundOptions,
    lobbyName,
    canAnswer,
    displayAnswer,
    hotseatOptions,
  } = state.game;

  return {
    timer,
    user,
    phase,
    currentQuestionId,
    questions,
    roundOptions,
    lobbyName,
    canAnswer,
    displayAnswer,
    hotseatOptions,
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(GameScreen);
