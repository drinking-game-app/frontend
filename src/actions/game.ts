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

export const startGame = () => {
    return {
        type: 'START_GAME',
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
