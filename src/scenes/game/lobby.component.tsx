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
import { Icon, ListItem, List, IconProps, Button, Layout, Text } from "@ui-kitten/components";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import { gameActions } from "../../actions";
import { LobbyScreenProps } from "../../navigation/game.navigator";
import { ButtonInput } from "../../components/form-button.component";
import { AppRoute } from "../../navigation/app-routes";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

interface IActions extends LobbyScreenProps {
  setGameLoading: () => void;
  leaveGame: () => void;
  startGame: () => void;
}

/**
 * Interface for props being
 * passed to to the lobby component
 */
interface IProps {
  players: IPlayer[];
  isLoading: boolean;
  isHost: boolean;
}

const LobbyScreen = (props: IProps & IActions) => {
  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="person" />
  );

  const renderItem = ({ item }: any) => (
    <ListItem title={item.name} accessoryLeft={renderItemIcon} />
  );

  const endGame = () => {
    props.setGameLoading();
    props.leaveGame();
    props.navigation.navigate(AppRoute.HOME);
  };

  const startGame = () => {
    props.setGameLoading();
    props.startGame();
    props.navigation.navigate(AppRoute.GAME);
  };

  let players: IPlayer[] = props.players;
  if (players.length < 4)
    players = [
      ...players,
      ...new Array(3).fill({ name: "Waiting for player..." }),
    ];

  const readyToPlay = props.players.length > 3;
  return (
    <Layout style={styles.container}>
      <Text style={styles.title}>Join with this code: HK3J</Text>

      <ButtonInput
        style={styles.submitButton}
        onPress={endGame}
        disabled={props.isLoading}
        loading={props.isLoading}
        text={props.isHost ? "End Game" : "Leave Lobby"}
      />
      <List
        style={styles.listContainer}
        data={players}
        renderItem={renderItem}
      />

      {props.isHost ? (
        <ButtonInput
          style={styles.submitButton}
          onPress={startGame}
          disabled={props.isLoading || !readyToPlay}
          loading={props.isLoading}
          text={
            readyToPlay
              ? "Start Game"
              : `Waiting for ${4 - props.players.length} player${
                    4 - props.players.length > 1 ? "s" : ""
                }`
          }
        />
      ) : (
        <ButtonInput
          style={styles.submitButton}
          disabled={true}
          loading={props.isLoading}
          text={
            readyToPlay
              ? "Waiting for host to start the game"
              : `Waiting for ${4 - props.players.length} player${
                4 - props.players.length > 1 ? "s" : ""
                }`
          }
        />
      )}
    </Layout>
  );
};

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { players, isLoading, isHost } = state.game;

  return {
    players,
    isLoading,
    isHost,
  };
};

export default connect<IProps, IActions>(
  mapStateToProps,
  gameActions
)(LobbyScreen);
