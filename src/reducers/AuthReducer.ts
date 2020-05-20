/*
 * File: AuthReducer.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 14th May 2020 3:12:41 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Reducer for all authentication related requests and actions
 * Last Modified: Saturday, 16th May 2020 8:56:51 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { IInitialState, IAction } from "./interfaces";

/**
 * Initial state for redux
 * Stores info about the
 * registering / logged in user
 */
const initialState: IInitialState = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  toRegister: false,
  canSubmit: false,
  token: "",
  actionSuccess: false,
  error: "",
  authedWithGoogle: false,
};

/**
 * Reducers for authentication
 *
 * @param {InitialState, IAction} initialState, action
 */
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    /**
     * Toggles the toRegister boolean
     * Determinds whether to display the
     * login or register component
     */
    case "IS_REGISTERING":
      return {
        ...state,
        toRegister: !state.toRegister,
      };

    /**
     * Handles form on change events for
     * login & register forms
     */
    case "FORM_UPDATE":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };

    /**
     * When a user has
     * successfully registered
     */
    case "USER_REGISTERED":
      return {
        ...state,
        toRegister: false,
        name: "",
        password: "",
        confirm_password: "",
        actionSuccess: true,
        error: "",
      };

    /**
     * When a API request responds with
     * an error, store it in the state
     */
    case "REQUEST_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };

    /**
     * When a user has successfully
     * logged in
     */
    case "USER_LOGGED_IN":
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.user!.name,
        email: action.payload.user!.email,
        _id: action.payload.user!._id,
        password: "",
        error: "",
      };

    /**
     * When a user has successfully
     * logged in with Google
     */
    case "USER_LOGGED_IN_GOOGLE":
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.user!.name,
        email: action.payload.user!.email,
        _id: action.payload.user!._id,
        password: "",
        error: "",
        authedWithGoogle: true,
      };
    /**
     * When a user has logged out
     */
    case "USER_LOGGED_OUT":
      return {
        ...state,
        token: "",
        _id: "",
        name: "",
        email: "",
      };

    /**
     * The default state reducer
     */
    default:
      return state;
  }
};
