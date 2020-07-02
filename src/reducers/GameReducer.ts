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

import { IGameState, IPlayer, IMessage } from "./interfaces";
import { RoundOptions, Question } from "@rossmacd/gamesock-client";
import { getPlayers } from '@rossmacd/gamesock-client';

interface IGameAction {
  type: string;
  payload: any;
}

const colours = [
  "#972852", "#96251C", "#497BB6", "#AF39B2", "#A45EDC", "#D49D6D"
]

/**
 * Initial state for redux
 * Stores info about the
 * lobby name and current user
 */
const initialState: IGameState = {
  lobbyName: "",
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
  roundOptions: undefined,
  numOfRounds: 3,
  init: false,
  canAnswer: false,
  displayAnswer: false,
  editUser: false,
  userToEditIndex: 0
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
        init: true,
      };
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
      let message = action.payload as string
      let activePlayers = state.players

      if(message.includes('transport close')) {
        const playerI = activePlayers.findIndex(player => message.includes(player.id))
        if(playerI !== -1) {
          message = message.replace(activePlayers[playerI].id, activePlayers[playerI].name)
          console.log('modified message', message)
          activePlayers.splice(playerI, 1)
        }
      }

      let result: IMessage = {
        hide: false,
        message: message
      }

      /**
       * Push the new message to the array
       */
      messages.push(result);
      
      /**
       * Grab loading and error from the state
       */
      let isLoading = state.isLoading
      let error = state.error
      
      /**
       * If the message is a lobby does not exist error
       * add the error too
       */
      if(isLoading && action.payload.includes('does not exist')) {
        isLoading = false
        error = action.payload
      } else error = ''

      return {
        ...state,
        messages: [...messages],
        isLoading: isLoading,
        error: error,
        players: [...activePlayers]
      };

    case "HIDE_MESSAGE":
      let allMessages = state.messages;
      const i = allMessages.findIndex((dat => dat.message === action.payload))
      
      if(allMessages[i] && allMessages[i].hide) {
        allMessages[i].hide = true
      } else allMessages[allMessages.length - 1].hide = true

      return {
        ...state,
        messages: [...allMessages]
      };

    case "HIDE_MESSAGE_INDEX":
      let existingMessages = state.messages;
      existingMessages.splice(action.payload, 1)

      return {
        ...state,
        messages: [...existingMessages]
      }

    /**
     * Update the list of players
     */
    case "PLAYER_LIST_UPDATE":
      const newPlayers = action.payload as IPlayer[]
      newPlayers.map((player, i) => {
        if(i > colours.length - 1) {
          return player.colour = colours[i - colours.length]  
        }
        return player.colour = colours[i]
      })
      return {
        ...state,
        players: [...newPlayers],
      };
    /**
     * Update a single player
     */
    case "PLAYER_SINGLE_UPDATE":
      let players = state.players;
      const playerI = state.players.findIndex(
        (player: IPlayer) => player.id === action.payload.id
      );
      
      players[playerI] = {score: players[playerI].score, colour: players[playerI].colour, ...action.payload}

      return {
        ...state,
        players: [...players],
        isLoading: false,
        editUser: false
      };

    /**
     * Prepare to redirect the player back to the lobby
     * on update
     */
    case "SINGLE_PLAYER_EDIT":
      const editUser = state.editUser
      if(action.payload !== "") {

        const playerI = state.players.findIndex(
          (player: IPlayer) => player.id === action.payload
        );
        
        return {
          ...state,
          editUser: !editUser,
          userToEditIndex:  playerI
        }
      }
      return {
        ...state,
        editUser: !editUser
      }

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
        error: ''
      };

    case "JOIN_GAME":
      const joinedPlayers: IPlayer[] = (action.payload.players||state.players)
      joinedPlayers.map((player, i) => {
        if(i > colours.length - 1) {
          return player.colour = colours[i - colours.length]  
        }
        return player.colour = colours[i]
      })

      return {
        ...state,
        lobbyName: action.payload.lobbyName,
        user: action.payload.user,
        players: [...joinedPlayers],
        inLobby: true,
        isLoading: false,
        roundOver: false,
        error: ''
      };

    case "LEAVE_GAME":
      return {
        ...state,
        lobbyName: "",
        inGame: false,
        inLobby: false,
        isHost: false,
        isLoading: false,
        questions: [],
        error: ''
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
        questions: [],
        currentQuestionId: 0,
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
      /* 
        ❗ WARNING ❗🧾 READ ME 🧾 
        This case is confusing and important to get right to stay in sync - hence this massive detailed comment.

        When the timer gets an update 3 things can happen-
          1. The new timer (action.payload) can increase - meaning a new timer has started (usually will be from 0 to a new value)

          2. The timer can hit 0 - the timer is done

          3. The timer can decrease by one - In this case the timer is running (nothing needs to be done, the state is just updated)
        
        Currently only the 1st is important - the timer is purely for display for any **other** purpose
        When the timer is in "hotseat ready" or "display answer" phase and a new timer starts we know that we should ask the next question

        Below is the cycle of the frontend when the hotseat has been started

        00--> [START_HOTSEAT]
        ----> PHASE: "Hotseat Ready"

        02--> [TIMER_UPDATE]-> (timer > oldTimerValue) -> We know a new timer has started
        ---->  PHASE: "Hotseat"

        03--> ♻[TIMER_UPDATE]♻-> timer-- -> update display timer

        04--> [ON_HOTSEAT_ANSWER] -> if phase !=="Hotseat" we are out of sync!
        ----> PHASE: "DisplayAnswer" 
        ----> if all questions have been proccessed end round
        ---> else [TIMER_UPDATE] loop to step 02
        

      */
     if(action.payload>state.timer){
      // If the phase is display answer we need to increase the question ID, hotseat ready only happens for the first question of the round
      if( state.phase==="Display Answer"){
        const newQuestionId = state.currentQuestionId+=1 
        return {
          ...state,
          timer: action.payload,
          currentQuestionId: newQuestionId,
          phase: 'Hotseat',
          canAnswer: true,
          displayAnswer: false,
        }
      }else if(state.phase==="Hotseat ready") {
        return {
          ...state,
          timer: action.payload,
          currentQuestionId: 0,
          phase: 'Hotseat',
          canAnswer: true,
          displayAnswer: false,
        }
      }else if(state.phase==="Hotseat"){
        console.error("Hotseat probably out of sync")
      }
    } 
    // else if (action.payload===0){
    //   // Timer is done - new phase
    // }else {
    //     // If the value decreases by one should be safe to return
    //     return {
    //       ...state,
    //       timer: action.payload,
    //     }
    //   }

    //   if (
    //     action.payload === 0 &&
    //     state.phase === "Hotseat" &&
    //     state.timer !== 0
    //   ) {
    //     // console.log("shifting questions", state.questions);
    //     // const shiftedQuestions = state.questions.shift()
    //     // console.log('done', shiftedQuestions)
    //     // state.questions.shift();
    //     const newQuestionId = state.currentQuestionId+=1 
    //     console.log("affetare questions", state.questions);
    //     return {
    //       ...state,
    //       timer: action.payload,
    //       // questions: [...state.questions],
    //       currentQuestionId: newQuestionId,
    //       phase: 'Display answer',
    //       canAnswer: true,
    //       displayAnswer: false,
    //     };
    //   }
      return {
        ...state,
        timer: action.payload,
      };
    case "SET_PHASE":
      if (action.payload === "Round Ended") {
        
        if(state.isHost) {
          getPlayers(state.lobbyName)
          console.log('Updating players for score')
        }
        return {
          ...state,
          phase: action.payload,
          roundOver: true,
          inGame: false,
        };
      }

      return {
        ...state,
        phase: action.payload,
      };

    case "START_HOTSEAT":
      // const allQuestions =  as Question[]
      // const hotseatOptions =  as HotseatOptions
      console.log("start hotseat reducer", action.payload);
      return {
        ...state,
        phase:"Hotseat ready",
        questions: [...action.payload.questions],
        hotseatOptions: action.payload.hotseatOptions,
        canAnswer: true,
      };
    case "ON_HOTSEAT_ANSWER":
      let newQuestions = state.questions;
      const answers =
        action.payload.answers.length > 0
          ? action.payload.answers
          : [null, null];
      console.log(
        "finding question and inserting answers!",
        newQuestions,
        action.payload.questionIndex,
        answers
      );
      newQuestions[action.payload.questionIndex].answers = [...answers];

      return {
        ...state,
        questions: [...newQuestions],
        displayAnswer: true,
        canAnswer: false,
        phase: "Display Answer"
      };
    case "ON_NEXT_QUESTION":
      return {
        ...state,
        displayAnswer: false,
      };
    // case "SET_CURRENT_QUESTION":
    //   return {
    //     ...state,
    //     currentQuestionId: state.currentQuestionId += 1,
    //     displayAnswer: false,
    //     canAnswer: true,
    //   };

    case "ANSWER_QUESTION":
      return {
        ...state,
        canAnswer: false,
      };

    case "END_GAME":
      // if(state.isHost) {
      //   getPlayers(state.lobbyName)
      //   console.log('Updating players for score')
      // }
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
