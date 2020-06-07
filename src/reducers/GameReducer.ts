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

import { IGameState, IPlayer, IQuestion } from "./interfaces";

// import { IInitialState, IAction } from "./interfaces";

interface IGameAction {
  type: string;
  payload: {
    prop?: string;
    value?: string;
    lobbyName?: string;
    username?: string;
    question?: string;
  };
}

const playersArr: IPlayer[] = [
  {
    name: "John",
    points: 300
  },
  {
    name: "Ross",
    points: 700
  },
  {
    name: "Sue Reardon",
    points: 12000
  },
  {
    name: "It has to be wack'm",
    points: 20
  },
];

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
  error: "",
  pickedPlayers: [playersArr[0], playersArr[3]],
  questionInput: "Who\'s more likely to",
  questions: [],
  numOfQuestions: 3,
  numOfRounds: 3,
  roundOver: false,
  round: 0,
  phase: "",
  currentQuestion: {
    question: "",
    username: ""
  }
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
        username: action.payload.username,
        inLobby: true,
        isHost: true,
        isLoading: false,
      };
    case "JOIN_GAME":
      return {
        ...state,
        lobbyName: action.payload.lobbyName,
        username: action.payload.username,
        inLobby: true,
        isLoading: false,
      };

    case "LEAVE_GAME":
      return {
        ...state,
        lobbyName: "",
        inGame: false,
        inLobby: false,
        isHost: false,
        isLoading: false,
      };

    case "START_GAME":
      return {
        ...state,
        inGame: true,
        isLoading: false,
      };
    case "START_GAME":
      return {
        ...state,
        inGame: true,
        isLoading: false,
      };

    case "INPUT_QUESTION":
      const questions = state.questions
      
      questions.push(action.payload as IQuestion)

      return {
        ...state,
        questionInput: "Who\'s more likely to",
        questions: questions,
        isLoading: false
      };

    case "SET_PHASE": 
      if(action.payload === "Leaderboard") return {
        ...state,
        phase: action.payload,
        roundOver: true,
        inGame: false
      }
      
      return {
        ...state,
        phase: action.payload
      }
    case "ANSWER_QUESTION":
      let stateQuestions = state.questions
      const questionI = stateQuestions.findIndex(question => question.username === action.payload.username)

      stateQuestions[questionI] = action.payload as IQuestion

      return {
        ...state,
        questions: stateQuestions
      }
    case "END_GAME":
      return {
        ...state,
        roundOver: true,
        inGame: false
      }
    /**
     * The default state reducer
     */
    default:
      return state;
  }
};
