/*
 * File: picked-players.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 5th June 2020 11:13:02 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Component for picked players during a game
 * Last Modified: Friday, 5th June 2020 11:13:07 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { Layout, Card, Text, Button } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { Player, Question } from "@rossmacd/gamesock-client";
import Answers from './answers.component'

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Game");

/**
 * Interface actions
 * for the component
 */
interface IActions {
  answerQuestion?: (questionIndex: number, playerId: number) => void;
}

/**
 * Interface for props being
 * passed to to the picked players component
 */
interface IProps {
  players: [Player, Player] | undefined;
  question?: Question;
  questionIndex?: number;
  user: Player;
  canAnswer?: boolean;
  displayAnswer?: boolean;
}

const PickedPlayers = (props: IProps & IActions) => {
  const canSelectAnswer = props.players?.some(
    (player) => player.id === props.user.id
  );

  /**
   * When a player selects an answer
   *
   * @param {number} i
   */
  const onSelectPlayer = (i: number) => {
    if (canSelectAnswer && props.canAnswer && props.answerQuestion) {
      props.answerQuestion(props.questionIndex!, i);
    }
  };

  /**
   * Render the question answer
   */
  const displayQuestionAnswer = () => {
    if (props.displayAnswer) {
      return <Answers />
    }

    return <></>
  }

  /**
   * Renders the text title for ingame picked players
   */
  const renderTextTitle = () => {
    if (props.question?.question)
      return (
        <React.Fragment>
          <Text style={styles.titleNotChosen}>
            {canSelectAnswer
              ? props.canAnswer
                ? ""
                : "Waiting for next question..."
              : "Waiting for players to answer..."}
          </Text>

          <Text style={styles.question}>{props.question.question}</Text>
        </React.Fragment>
      );

    return (
      // <Text style={styles.title}>Picked Players</Text>
      <Text style={styles.titleChosenYellow}>CHOSEN <Text style={styles.titleChosenRed}>VICTIMS</Text></Text>
    );
  };

  return (
    <Layout style={styles.container}>
      {renderTextTitle()}

      <View style={styles.pickedPlayerContainer}>
        {props.players?.map((player, i) => {
          const isPlayer = player.id === props.user.id;

          if (canSelectAnswer)
            return (
              <View style={styles.pickedPlayer} key={i}>

                <Button
                  disabled={!props.canAnswer}
                  style={[
                    styles.pickedPlayerCard,
                    i === 0 
                      ? (!props.displayAnswer ? styles.cardPink : styles.cardPinkAnswer) 
                      : (!props.displayAnswer ? styles.cardPurple : styles.cardPurpleAnswer),
                  ]}
                  size="giant"
                  onPress={() => onSelectPlayer(i)}
                >
                  {player.name}
                </Button>

                <Text
                  style={[
                    styles.belowCardText,
                    i === 0 ? styles.alignLeft : styles.alignRight,
                  ]}
                  appearance="hint"
                >
                  {player.name} {isPlayer ? "(You)" : ""}
                </Text>
              </View>
            );

          return (
            <View style={styles.pickedPlayer} key={i}>

              <Card
                style={[
                  styles.pickedPlayerCard,
                  i === 0 
                  ? (!props.displayAnswer ? styles.cardPink : styles.cardPinkAnswer) 
                  : (!props.displayAnswer ? styles.cardPurple : styles.cardPurpleAnswer),
                ]}
                onPress={() => onSelectPlayer(i)}
              >
                <Text style={styles.title}>{player.name}</Text>
              </Card>

              <Text
                style={[
                  styles.belowCardText,
                  i === 0 ? styles.alignLeft : styles.alignRight,
                ]}
                appearance="hint"
              >
                {player.name} {isPlayer ? "(You)" : ""}
              </Text>
            </View>
          );
        })}
        {displayQuestionAnswer()}
      </View>
    </Layout>
  );
};

export default PickedPlayers;
