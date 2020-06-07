/*
 * File: interfaces.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 16th May 2020 8:49:32 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Interfaces for Authentication reducers
 * Last Modified: Saturday, 16th May 2020 8:54:47 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import {Player, Question, RoundOptions} from '@rossmacd/gamesock-client'

/**
 * Interface for a user
 */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  accessToken?: string;
}

/**
 * Interface for a reducer action
 */
export interface IAction {
  type: string;
  payload: {
    prop: string;
    value: string;
    user: IUser;
    token: string;
    error: string;
  };
}

/**
 * Interface for the auth state
 */
export interface IAuthState {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  isLoading: boolean;
  canSubmit: boolean;
  token: string;
  actionSuccess: boolean;
  error: string;
  authedWithGoogle: boolean;
  accessToken?: string
}


export interface IPlayer extends Player {
  pIndex?:number
  inHotseat?:boolean
}


/**
 * Interface for a question
 */
export interface IQuestion {
  username: string;
  question: string;
  answer?: number;
}

/**
 * Interface for the game state
 */
export interface IGameState {
  lobbyName: string;
  username: string;
  inLobby: boolean;
  inGame: boolean;
  isHost: boolean;
  players: IPlayer[];
  error:string;
  isLoading:boolean;
  messages: string[];
  pickedPlayers: IPlayer[];
  questionInput: string;
  questions: IQuestion[]
  roundOver: boolean;
  round: number;
  phase: string;
  currentQuestionId: number;
  askedQuestions: Question[];
  roundOptions: RoundOptions | undefined;
}

/**
 * Interface for the initial state
 */
export interface IInitialState {
  auth: IAuthState;
  game: IGameState;
}
