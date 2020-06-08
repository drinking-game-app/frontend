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
import { RoundOptions, Question } from "@rossmacd/gamesock-client";
import { HotseatOptions } from "../actions/socket";

interface IGameAction {
  type: string;
  payload: any;
}

/**
 * Initial state for redux
 * Stores info about the
 * lobby name and current user
 */
const initialState: IGameState = {
  lobbyName: "",
  username: "",
  user: {
    id: "",
    name: "",
    score: 0,
    inHotseat: false,
  },
  inLobby: false,
  inGame: false,
  isHost: false,
  players: [],
  isLoading: false,
  error: "",
  messages: [],
  pickedPlayers: [],
  questionInput: "Who's more likely to",
  questions: [],
  roundOver: false,
  round: 0,
  phase: "",
  timer: 0,
  hotseatOptions: undefined,
  currentQuestionId: 0,
  askedQuestions: [],
  roundOptions: undefined,
  numOfRounds: 3,
  init: false
};

/**
 * Reducers for authentication
 *
 * @param {InitialState, IAction} initialState, action
 */
export default (state = initialState, action: IGameAction) => {
  switch (action.type) {
    case "INITIALISE_GAMESOCK":
      return {
        ...state,
        init: true
      }
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
     * Update the messages array
     * with messages from the gamesock
     * server
     */
    case "SET_MESSAGES":
      const messages = state.messages;
      messages.push(action.payload as string);

      return {
        ...state,
        messages: messages,
      };

    /**
     * Update the list of players
     */
    case "PLAYER_LIST_UPDATE":
      
      return {
        ...state,
        players: [...action.payload],
      };
    /**
     * Update a single player
     */
    case "PLAYER_SINGLE_UPDATE":
      let players = state.players;
      const playerI = state.players.findIndex(
        (player: IPlayer) => player.id === action.payload.id
      );

      players[playerI] = action.payload as IPlayer;

      return {
        ...state,
        players: [...players],
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
        user: action.payload.user,
        inLobby: true,
        isHost: true,
        isLoading: false,
      };

    case "JOIN_GAME":
      

      return {
        ...state,
        lobbyName: action.payload.lobbyName,
        user: action.payload.user,
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
        numOfRounds: action.payload,
      };

    case "START_ROUND":
      const roundOptions = action.payload as RoundOptions;
      let user = state.user;
      if (
        roundOptions.hotseatPlayers.some(
          (player: IPlayer) => player.id === user.id
        )
      ) {
        user.inHotseat = true;
      } else user.inHotseat = false;

      return {
        ...state,
        inGame: true,
        isLoading: false,
        user: user,
        roundOptions: roundOptions,
      };

    case "INPUT_QUESTION":
      const questions = state.questions;

      questions.push(action.payload as Question);

      return {
        ...state,
        questionInput: "Who's more likely to",
        questions: questions,
        isLoading: false,
      };

    case "TIMER_UPDATE":
      if (action.payload === 0 && state.phase === 'Hotseat' &&state.timer!==0) {
        console.log('shifting questions', state.questions)  
        // const shiftedQuestions = state.questions.shift()
        // console.log('done', shiftedQuestions)  
        state.questions.shift()

        console.log('affetare questions', state.questions)  
        return {
            ...state,
            timer: action.payload,
            questions: [...state.questions],
            currentQuestionId: state.currentQuestionId++
        }
      }
      return {
        ...state,
        timer: action.payload,
      };
    case "SET_PHASE":
      if (action.payload === "Round Ended") 
        return {
          ...state,
          phase: action.payload,
          roundOver: true,
          currentQuestionId: 0,
          inGame: false,
          askedQuestions: [],
        };

      return {
        ...state,
        phase: action.payload,
      };

    case "START_HOTSEAT":
      // const allQuestions =  as Question[]
      // const hotseatOptions =  as HotseatOptions
      console.log('start hotseat reducer', action.payload)
      return {
        ...state,
        questions: [...action.payload.questions],
        hotseatOptions: action.payload.hotseatOptions
      }
    case "ON_HOTSEAT_ANSWER":
      let newQuestions = state.questions
      newQuestions[action.payload.questionIndex].answers = action.payload.answers
      return {
        ...state,
        questions: [...newQuestions]
      }

    case "SET_CURRENT_QUESTION":
      return {
        ...state,
        currentQuestionId: state.currentQuestionId += 1,
      };

    case "ANSWER_QUESTION":
      let stateQuestions = state.questions;
      const questionI = stateQuestions.findIndex(
        (question) => question.playerId === action.payload.id
      );

      stateQuestions[questionI] = action.payload as Question;

      return {
        ...state,
        questions: stateQuestions,
      };

    case "END_GAME":
      return {
        ...state,
        roundOver: true,
        inGame: false,
      };
    /**
     * The default state reducer
     */
    default:
      return state;
  }
};
