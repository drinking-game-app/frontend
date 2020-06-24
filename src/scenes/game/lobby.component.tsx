/*
 * File: lobby.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 3rd June 2020 2:52:35 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: In game lobby for both host and players
 * Last Modified: Wednesday, 3rd June 2020 3:00:55 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { gameActions } from "../../actions";
import { LobbyScreenProps } from "../../navigation/game.navigator";
import { ButtonInput } from "../../components/form-button.component";
import { AppRoute } from "../../navigation/app-routes";
import * as GameSockClient from '@rossmacd/gamesock-client'
import { ModalHeaderLobby } from "../../components/modal-header-lobby.component";
import LoadingComponent from "../../components/loading.component";
import NotificationBar from "../../components/notification-bar.component"
import { Layout } from "@ui-kitten/components";
import GameTabs from "./game-tabs.component";


/**
 * Importing styles
 * @param theme path
 * @param Game Module name
 */
const styles = require("../../themes")("Game");

interface IActions extends LobbyScreenProps {
  setGameLoading: () => void;
  leaveGame: () => void;
  startHostGame: (lobbyName: string) => void;
}

/**
 * Interface for props being
 * passed to to the lobby component
 */
interface IProps {
  players: IPlayer[];
  isLoading: boolean;
  isHost: boolean;
  lobbyName: string;
  roundOver: boolean;
  roundOptions: GameSockClient.RoundOptions | undefined; 
  numOfRounds: number;
  timer: number
}

const LobbyScreen = (props: IProps & IActions) => {

  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const startGame = () => {
    props.setGameLoading();
    GameSockClient.startGame(props.lobbyName)
    props.navigation.navigate(AppRoute.GAME);
  };

  const gameIsFinished = props.roundOptions
  ? (props.roundOptions.roundNum === props.numOfRounds) 
  : false

  const renderModalTitle = () => {
    if(!gameIsFinished && props.roundOver) {
      if(props.timer <= 0) return 'Starting next round...'
      return 'Next round starts in'
    }
    if(gameIsFinished) return 'LEADERBOARD'
    return 'Send this code to your friends:'
  }

  const renderModalCode = () => {
    if(!gameIsFinished && props.roundOver) {
      return props.timer <= 0 ? '0' : `${props.timer}` 
    }
    return props.lobbyName
  }

  



  const readyToPlay = props.players.length > 3;
  if(props.lobbyName === "") return <LoadingComponent text="Loading Lobby..." />
  return (
    <Layout style={styles.container}>
      <ModalHeaderLobby
        text={renderModalTitle()}
        lobbyCode={renderModalCode()}
        buttonText={props.isHost ? "End Game" : "Leave Lobby"}
        loading={false}
        disabled={props.isLoading}
        isLeaderboard={props.roundOver}
        icon="close-outline"
        status="info"
        onPress={() => endGame()}
      />
      
      <GameTabs showTabs={props.roundOver} />

      {props.isHost ? (
        <ButtonInput
          style={styles.submitButton}
          status='success'
          onPress={startGame}
          disabled={(props.isLoading || !readyToPlay) || (!props.roundOver ? gameIsFinished : false)}
          loading={props.isLoading}
          text={
            readyToPlay
              ? props.roundOver ? `${gameIsFinished ? 'START NEW GAME' : `BUT WAIT, THERE'S MORE! (${props.numOfRounds} ROUNDS)`}` : 'PLAY TIME!'
              : `WAITING FOR ${4 - props.players.length} PLAYER${
                    4 - props.players.length > 1 ? "S" : ""
                }`
          }
        />
      ) : (
        <ButtonInput
          style={styles.submitButtonJoined}
          status='success'
          size='small'
          disabled={(props.isLoading || !readyToPlay) || (!props.roundOver ? gameIsFinished : false)}
          loading={props.isLoading}
          text={
            readyToPlay
              ? props.roundOver ? `${gameIsFinished ? 'WAITING FOR HOST...' : `GET READY FOR ROUND ${props.numOfRounds}`}` : 'WAITING FOR HOST...'
              : `WAITING FOR ${4 - props.players.length} PLAYER${
                4 - props.players.length > 1 ? "S" : ""
                }`
          }
        />
      )}

      <NotificationBar />
    </Layout>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { players, isLoading, isHost, lobbyName, roundOver, roundOptions, numOfRounds, timer } = state.game;

  return {
    players,
    isLoading,
    isHost,
    lobbyName,
    roundOver,roundOptions, numOfRounds,
    timer
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(LobbyScreen);
