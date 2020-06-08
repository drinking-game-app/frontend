/*
 * File: game.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 4th June 2020 4:11:43 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Game related actions in the redux state
 * Last Modified: Thursday, 4th June 2020 6:14:09 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { IPlayer } from "../reducers/interfaces"
import * as GameSockClient from '@rossmacd/gamesock-client'
import { GameOptions, HotseatOptions } from "./socket"

 /**
  * Interface for hosting a game
  */
export interface IHostGame {
    username: string;
    token: string;
}

/**
 * Interface for joining a game
 */
export interface IJoinGame {
    username: string;
    lobbyName: string;
}

/**
 * Determinds whether to set 
 * loading or not
 */
export const setGameLoading = () => {
    return {
        type: 'IS_LOADING_GAME'
    }
}

/**
 * Messages sent from the gamesock library
 */
export const setMessages = (message: string) => {
    console.log('Socket message: ', message)
    return {
        type: 'SET_MESSAGES',
        payload: message
    }
}


/**
 * Initilise a lobby as a host
 * 
 * @param {IHostGame} body 
 */
export const hostGame = (body: IHostGame) => {
    console.log('running host game!')
    return (dispatch: any) => {
        console.log('after return')
        const lobbyName = Math.random().toString(36).substr(2, 4).toUpperCase();
        
        console.log('lobby name!', lobbyName)
        GameSockClient.createLobby(lobbyName, body.token).then((players) => {
            console.log('lobby made', players)
            let user = Array.isArray(players)
            ? players[0]
            : players
            user.name = body.username
            
            GameSockClient.updateSelf(lobbyName, user)
            console.log('updated self', user)

            dispatch({
                type: 'HOST_GAME',
                payload: {lobbyName: lobbyName, user: user}
            })
        })
    }
}

/**
 * Initilise a lobby as a join
 * 
 * @param {IJoinGame} body 
 */
export const joinGame = (body: IJoinGame) => {
    GameSockClient.joinLobby(body.lobbyName).then((players) => {
        let user = Array.isArray(players)
        ? players[players.length - 1]
        : players
        user.name = body.username
        GameSockClient.updateSelf(body.lobbyName, user)

        return {
            type: 'JOIN_GAME',
            payload: {lobbyName: body.lobbyName, user: user}
        }
    })
}

/**
 * Start a new game
 * 
 */
export const startGame = (gameOptions: GameOptions) => {
    return {
        type: 'START_GAME',
        payload: gameOptions
    }
}

/**
 * Start a new round
 * 
 */
export const startRound = (roundOptions: GameSockClient.RoundOptions) => {
    return {
        type: 'START_ROUND',
        payload: roundOptions
    }
}

/**
 * Start a new game
 * 
 */
export const inputQuestion = (question: GameSockClient.Question) => {
    return {
        type: 'INPUT_QUESTION',
        payload: question
    }
}

/**
 * Updates the seconds left on a timer
 * 
 * @param {number} time 
 */
export const timerUpdate = (time: number) => {
    return {
        type: 'TIMER_UPDATE',
        payload: time
    }
}

/**
 * Starting a hot seat during a round
 * 
 * @param {Question[]} questions
 * @param {HotseatOptions} hotseatOptions
 */
export const startHotseat = (questions: GameSockClient.Question[], hotseatOptions: HotseatOptions) => {
    return {
        type: 'START_HOTSEAT',
        payload: {questions, hotseatOptions}
    }
}

export const onHotseatAnswer = (questionIndex: number, answers: number[]) => {
    return {
        type: 'ON_HOTSEAT_ANSWER',
        payload: {questionIndex, answers}
    }
}

/**
 * Update the list of players
 * 
 * @param {IPlayer[]} players
 */
export const playerListUpdate = (players: IPlayer[]) => {
    return {
        type: 'PLAYER_LIST_UPDATE',
        payload: players
    }
}

/**
 * Update a single player
 * 
 * @param {IPlayer} players
 */
export const playerUpdate = (player: IPlayer) => {
    return {
        type: 'PLAYER_SINGLE_UPDATE',
        payload: player
    }
}

/**
 * Leave a lobby / game
 *  
 */
export const leaveGame = () => {
    return {
        type: 'LEAVE_GAME',
    }
}

/**
 * Ends a game / round depending
 * on the number of rounds
 */
export const endGame = () => {
    return {
        type: 'END_GAME',
    }
}

/**
 * Set the phase within a game
 */
export const setPhase = (phase: string) => {
    return {
        type: "SET_PHASE",
        payload: phase
    }
}


/**
 * Answer a question within a game
 */
export const answerQuestion = (question: IQuestion) => {
    return {
        type: "ANSWER_QUESTION",
        payload: question
    }
}