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
import { IInitialState } from "../reducers/interfaces";

/**
 * Importing styles
 * @param theme path
 * @param Game Module name
 */
const styles = require("../themes")("Game");


interface IProps {
    messages: string[]
}

interface IStateMessage {
    message: string;
    hide: boolean; 
}

const NotificationBar = (props: IProps) => {
    const [messageArr, setMessageArr] = React.useState<IStateMessage[]>([])
    
    useEffect(() => {
        /**
         * Hide the new message after 5000ms
         * 
         * @param {number} i
         */
        const hideNewMessage = (i: number) => {
            setTimeout(() => {
                setMessageArr((oldMessages) => {
                    oldMessages[i].hide = true

                    return oldMessages
                })
            }, 5000);
        }
        console.log('new message!')

        /**
         * Check if the messages in the state are 
         * a different length to redux store messages 
         */
        if(props.messages.length !== messageArr.length) {
            console.log('updating array!')
            //Set the messages within the stat
            setMessageArr((oldMessages) => {
                //Hide all other messages
                oldMessages.map((dat) => dat.hide = true)
                //Push the new message and show
                oldMessages.push({
                    message: props.messages[props.messages.length - 1],
                    hide: false
                })

                hideNewMessage(oldMessages.length - 1)

                return oldMessages
            })
        }
    }, [props.messages])

    const messageToDisplay = messageArr.filter(dat => !dat.hide)

    if(messageToDisplay.length > 0) {
        return (
            <ButtonInput
                style={styles.submitButtonJoined}
                status='success'
                size='small'
                disabled={false}
                loading={false}
                text={messageToDisplay[0].message}
            />
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
    const { messages } = state.game;
  
    return {
        messages
    };
  };

export default connect<IProps>(mapStateToProps, null)(NotificationBar)