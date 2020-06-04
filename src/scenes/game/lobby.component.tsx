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
import { Icon, ListItem, List, IconProps, Button } from "@ui-kitten/components";
import { Text } from "react-native";
import { IPlayer, IInitialState } from "../../reducers/interfaces";
import { connect } from "react-redux";
import {gameActions} from "../../actions";
import { LobbyScreenProps } from "../../navigation/game.navigator";
import { ButtonInput } from "../../components/form-button.component";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

interface IActions extends LobbyScreenProps {
    setGameLoading: () => void;
    leaveGame: () => void;
}

/**
 * Interface for props being 
 * passed to to the lobby component
 */
interface IProps {
    players: IPlayer[];
    isLoading: boolean;
}

const LobbyScreen = (props: IProps & IActions) => {
    const renderItemIcon = (props: IconProps) => (
        <Icon {...props} name="person" />
    )

    const renderItem = ({item}: any) => (
        <ListItem
            title={item.name}
            accessoryLeft={renderItemIcon}
        />
    )

    const endGame = () => {
        props.setGameLoading()
        props.leaveGame()
    }
    
    let players: IPlayer[] = props.players
    if(players.length < 4) players = [...players, ...new Array(3).fill({name: 'Waiting for player...'})]
    
    return (
        <>
            <Text style={styles.title}>Join with this code: HK3J</Text>
            
            <ButtonInput
                style={styles.submitButton}
                onPress={endGame}
                disabled={props.isLoading}
                loading={props.isLoading}
                text="Leave Lobby"
            />
            <List
                style={styles.listContainer}
                data={players}
                renderItem={renderItem}
            />
        </>
    )
}


/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { players, isLoading } = state.game;
  
    return {
    players,
    isLoading
    };
  };

export default connect<IProps, IActions>(mapStateToProps, gameActions)(LobbyScreen)