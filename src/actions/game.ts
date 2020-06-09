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

import { GameSocketConfigExport, GameOptions, HotseatOptions } from "./socket"
import Constants from "expo-constants";
import { Dispatch } from "redux";
 
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

export const initGameSock = () => {
    return (dispatch: Dispatch) => {
        GameSockClient.setup(Constants.manifest.extra.SERVER_URL, `${Constants.manifest.extra.SERVER_URL}/timesync`)

        GameSockClient.onStartGame((newGameOptions:GameOptions)=>{
            console.log('starting game')
            startGame(newGameOptions.rounds, dispatch)
        })

        GameSockClient.onStartRound((newRoundOptions)=>{
            if(newRoundOptions.roundNum === 1) {setPhase('Starting Game', dispatch)}
            else {setPhase('Starting Round',dispatch)}
            console.log('starting round')

            startRound(newRoundOptions, dispatch)    

            setTimeout(() => {
                setPhase('Question Gathering', dispatch)  
            }, 2*1000);
        })

        GameSockClient.onStartHotseat((allQuestions,hotseatOptions)=>{
            console.log('starting hotseat')

            setPhase('Hotseat', dispatch)
            startHotseat(allQuestions,hotseatOptions, dispatch)
        })

        GameSockClient.onRoundEnd(() => {
            console.log('ending round')

            setPhase('Round Ended', dispatch)
            endGame()
        })

        GameSockClient.onSinglePlayerUpdate((newPlayer)=>{
            console.log('single player update', newPlayer)

            playerUpdate(newPlayer, dispatch)
        })

        GameSockClient.onPlayerListUpdate((players)=>{
            console.log('player list update', players)
            playerListUpdate(players, dispatch)
        })

        //   GameSockClient.onRequestQuestions(()=>{
        //       return props.questions.map(question => question.question);
        //   })

        GameSockClient.onHotseatAnswer((questionIndex,answers)=>{
            onHotseatAnswer(questionIndex,answers)
        })

        GameSockClient.onTimerUpdate((secondsLeft)=>{
            timerUpdate(secondsLeft, dispatch)
        })

        GameSockClient.onMessage((message)=>{
            setMessages(message.msg)
        })

        dispatch({
            type: 'INITIALISE_GAMESOCK',
        })
    }
}


/**
 * Initilise a lobby as a host from the home page
 * 
 * @param {IHostGame} body 
 */
export const hostGameAction = (body: IHostGame) =>  {
    return (dispatch: Dispatch) => {
        const lobbyName = Math.random().toString(36).substr(2, 4).toUpperCase();
        
        GameSockClient.createLobby(lobbyName, body.username, body.token).then((players) => {
            let user = Array.isArray(players)
            ? players[0]
            : players
            
            dispatch({
                type: 'HOST_GAME',
                payload: {lobbyName: lobbyName, user: user}
            })
        })
    }
}


/**
 * Initilise a lobby as a host from the login function
 * 
 * @param {IHostGame} body 
 */
export const hostGame = (body: IHostGame,dispatch:any) =>  {
        GameSocketConfigExport()
        const lobbyName = Math.random().toString(36).substr(2, 4).toUpperCase();
        
        GameSockClient.createLobby(lobbyName, body.username, body.token).then((players) => {
            
            let user = Array.isArray(players)
            ? players[0]
            : players

            dispatch({
                type: 'HOST_GAME',
                payload: {lobbyName: lobbyName, user: user}
            })
        })
    }

/**
 * Initilise a lobby as a join
 * 
 * @param {IJoinGame} body 
 */
export const joinGame = (body: IJoinGame) => {
    return (dispatch: Dispatch) => {
        GameSockClient.joinLobby(body.lobbyName, body.username).then((players) => {
            let user = Array.isArray(players)
            ? players[players.length - 1]
            : players
            
            // playerListUpdate(players, dispatch)
            dispatch({
                type: 'JOIN_GAME',
                payload: {lobbyName: body.lobbyName, user: user}
            })
        })
    }
}

/**
 * Start a new game as a host
 * 
 */
// export const startHostGame = (lobbyName: string) => {
//     // console.log('running host game be')
//     // return (dispatch: Dispatch) => {
//     //     console.log('starting game')
//         GameSockClient.startGame(lobbyName)
//         // ((gameOptions: GameOptions) => {
//         //     console.log('game starting!', gameOptions)
//         //     dispatch({
//         //         type: 'START_GAME',
//         //         payload: gameOptions.rounds
//         //     })
//         // })
//     // }
// }

/**
 * Start a new game
 * 
 */
export const startGame = (rounds: number, dispatch: Dispatch) => {
    dispatch({
        type: 'START_GAME',
        payload: rounds
    })
}

/**
 * Start a new round
 * 
 */
export const startRound = (roundOptions: GameSockClient.RoundOptions, dispatch: Dispatch) => {
    console.log('starting round!')
    dispatch({
        type: 'START_ROUND',
        payload: roundOptions
    })
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
export const timerUpdate = (time: number, dispatch: Dispatch) => {
    dispatch({
        type: 'TIMER_UPDATE',
        payload: time
    })
}

/**
 * Starting a hot seat during a round
 * 
 * @param {Question[]} questions
 * @param {HotseatOptions} hotseatOptions
 */
export const startHotseat = (questions: GameSockClient.Question[], hotseatOptions: HotseatOptions, dispatch: Dispatch) => {
    console.log('starting hotseat and setting questions!', questions)
    dispatch({
        type: 'START_HOTSEAT',
        payload: {questions, hotseatOptions}
    })
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
export const playerListUpdate = (players: IPlayer[], dispatch: Dispatch) => {

        dispatch({
            type: 'PLAYER_LIST_UPDATE',
            payload: players
        })
}

/**
 * Update a single player
 * 
 * @param {IPlayer} players
 */
export const playerUpdate = (player: IPlayer, dispatch: Dispatch) => {

    dispatch({
        type: 'PLAYER_SINGLE_UPDATE',
        payload: player
    })
}

/**
 * Leave a lobby / game
 *  
 */
export const leaveGame = () => {
    return (dispatch: Dispatch) => {
        
        dispatch({
            type: 'LEAVE_GAME'
        })
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
export const setPhase = (phase: string, dispatch: Dispatch) => {
    dispatch({
        type: "SET_PHASE",
        payload: phase
    })
}


/**
 * Answer a question within a game
 */
export const answerQuestion = (lobbyName: string, questionIndex: number, playerIndex: number) => {
    return (dispatch: Dispatch) => {
        GameSockClient.sendAnswer(lobbyName, questionIndex, playerIndex)
        dispatch({
            type: "ANSWER_QUESTION"
        })
    }
}