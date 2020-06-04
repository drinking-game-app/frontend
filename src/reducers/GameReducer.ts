/*
 * File: GameReducer.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 4th June 2020 3:56:51 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description:
 * Last Modified: Thursday, 4th June 2020 3:57:44 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { IGameState, IPlayer } from "./interfaces";

// import { IInitialState, IAction } from "./interfaces";


interface IGameAction {
  type: string;
  payload: {
    prop: string;
    value: string;
    lobbyName?: string;
    userName?: string;
  }
}


const playersArr: IPlayer[] = [
  {
      name: 'John'
  },
  {
      name: 'Ross'
  },
  {
      name: 'Sue Reardon'
  },
]

/**
 * Initial state for redux
 * Stores info about the
 * lobby name and current user
 */
const initialState: IGameState = {
  lobbyName: "",
  username: "",
  inLobby: false,
  inGame: false,
  isHost: false,
  players: playersArr,
  isLoading: false,
  error:""
};

/**
 * Reducers for authentication
 *
 * @param {InitialState, IAction} initialState, action
 */
export default (state = initialState, action: IGameAction) => {
  switch (action.type) {
    /**
     * Toggles the toRegister boolean
     * Determinds whether to display the
     * login or register component
     */
    case "IS_LOADING_GAME":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    /**
     * When a API request responds with
     * an error, store it in the state
     */
    // case "REQUEST_ERROR":
    //   return {
    //     ...state,
    //     error: action.payload.error,
    //     isLoading: false
    //   };

    case "HOST_GAME":
      return {
        ...state,
        lobbyName: action.payload.lobbyName,
        username: action.payload.userName,
        inLobby: true,
        isHost: true,
        isLoading: false
      }
    case "JOIN_GAME":
      return {
        ...state,
        lobbyName: action.payload.lobbyName,
        username: action.payload.userName,
        inLobby: true,
        isLoading: false
      }
      
    case "LEAVE_GAME":
        return {
          ...state,
          lobbyName: "",
          inGame: false,
          inLobby: false,
          isHost: false,
          isLoading: false
        }

    /**
     * The default state reducer
     */
    default:
      return state;
  }
};
