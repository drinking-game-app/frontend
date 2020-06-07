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

import { IQuestion } from "../reducers/interfaces"

 /**
  * Interface for hosting / joining a game
  */
export interface IHostGame {
    lobbyName: string;
    username: string;
}

/**
 * Interface for starting a game
 */
// export interface IStartGame {
//     token: string;
//     lobbyName: string;
// }

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
 * Initilise a lobby as a host
 * 
 * @param {IHostGame} body 
 */
export const hostGame = (body: IHostGame) => {
    return {
        type: 'HOST_GAME',
        payload: body
    }
}

/**
 * Initilise a lobby as a join
 * 
 * @param {IHostGame} body 
 */
export const joinGame = (body: IHostGame) => {
    return {
        type: 'JOIN_GAME',
        payload: body
    }
}

/**
 * Start a new game
 * 
 */
export const startGame = () => {
    return {
        type: 'START_GAME',
    }
}

/**
 * Start a new game
 * 
 */
export const inputQuestion = (question: IQuestion) => {
    return {
        type: 'INPUT_QUESTION',
        payload: question
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