/*
 * File: notification-bar.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 19th June 2020 2:55:51 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Handles notifcations and messages from the game sock client
 * Last Modified: Friday, 19th June 2020 2:55:59 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React, { useEffect } from "react";
import { ButtonInput } from "./form-button.component";
import { connect } from "react-redux";
import { Text, Layout } from '@ui-kitten/components'
import { IInitialState, IMessage, IPlayer } from "../reducers/interfaces";
import { View } from "react-native";
import { setTimeout } from "timers";

/**
 * Importing styles
 * @param theme path
 * @param Game Module name
 */
const styles = require("../themes")("Notification");


interface IProps {
    messages: IMessage[];
    players: IPlayer[]
}

const NotificationBar = ({messages, players}: IProps) => {

    // const forceHideMessage = (message: string) => {
    //     setTimeout(() => {
    //         messages.findIndex(dat => dat.message)
    //     }, 10000)
    // }
    if(messages.some(dat => !dat.hide)) {
      return (
            <View style={styles.container}>
                {messages.filter(message => !message.hide).map((message, i) => {
                    let messageToDisplay = message.message
                    let colour = '#972852'
                    
                    const playerI = players.findIndex(player => messageToDisplay.includes(player.id))
                   
                    /**
                     * If a player ID is mentioned in the message
                     * replace it with the players name, and their colour
                     */
                    if(playerI >= 0) {
                        messageToDisplay = messageToDisplay.replace(players[playerI].id, players[playerI].name)
                        colour = players[playerI].colour ? players[playerI].colour as string : 'red'
                    }

                    
                    forceHideMessage(message.message)
                        
                    
                    return (
                        <ButtonInput
                            key={i}
                            style={[styles.notification, {backgroundColor: colour}]}
                            status='success'
                            size='small'
                            disabled={false}
                            loading={false}
                            text={messageToDisplay}
                        />
                    )
                })
            }
            </View>
        )
    }

    return <></>
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { messages, players } = state.game;

    return {
        messages,
        players
    };
};

export default connect<IProps>(mapStateToProps)(NotificationBar)

// export default NotificationBar