/*
 * File: index.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Thursday, 14th May 2020 3:16:19 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Authentication related actions in the redux state
 * Last Modified: Saturday, 16th May 2020 8:55:16 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { ICreate, IForm, ILogin, IToken, IGoogleToken } from "./interfaces"
import getEnvVars from '../../environment'


const { SERVER_URL } = getEnvVars()

/**
 * Prefixes for api endpoints
 */
const userPrefix = "/api/user"
const authPrefix = "/api/auth"

/**
 * Get the baseURL for the server either from the .env file
 * or use a static IP
 */
const baseUrl = SERVER_URL || 'http://192.168.0.164:3000'

/**
 * Determinds whether to display the login
 * or register view
 */
export const isRegistering = () => {
    return {
        type: 'IS_REGISTERING'
    }
}

/**
 * Updates an item in the redux store
 * 
 * @param {IForm} {prop, value}
 */
export const formUpdate = ({prop, value}: IForm) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value }
    }
}

/**
 * Register a user
 * 
 * @param {ICreate} body
 */
export const create  = (body: ICreate) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${userPrefix}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                return dispatch({ type: 'REQUEST_ERROR', payload: data })
            }

            dispatch({ type: 'USER_REGISTERED', payload: data })
        })
        .catch((err) => {
            console.log(err)
            return dispatch({ type: 'REQUEST_ERROR', payload: {error: 'Error: Could not connect to the server'} })
        })
    }
}

/**
 * Login
 * 
 * @param {ILogin} body 
 */
export const login  = (body: ILogin) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                return dispatch({ type: 'REQUEST_ERROR', payload: data })
            }
            dispatch({ type: 'USER_LOGGED_IN', payload: data.data })
        })
        .catch((err) => {
            console.log(err)
            return dispatch({ type: 'REQUEST_ERROR', payload: {error: 'Error: Could not connect to the server'} })
        })
    }
}

/**
 * Login with Google
 * 
 * @param {IToken} token 
 */
export const loginWithGoogle  = (token: IGoogleToken) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/signin/google/${token.type}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token)
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                return dispatch({ type: 'REQUEST_ERROR', payload: data })
            }
            
            if(data.data.user.accessToken) dispatch({ type: 'USER_LOGGED_IN_GOOGLE_MOBILE', payload: data.data })
            else dispatch({ type: 'USER_LOGGED_IN_GOOGLE', payload: data.data })
        })
        .catch((err) => {
            console.log(err)
            return dispatch({ type: 'REQUEST_ERROR', payload: {error: 'Error: Could not connect to the server'} })
        })
    }
}



/**
 * Logout a user
 * 
 * @param {IToken} credentials
 */
export const logout  = (credentials: IGoogleToken) => {
    /**
     * If an access token exists, add it to the request url
     */
    const signOutUrl = credentials.accessToken
    ? `signout/${credentials.accessToken}`
    : 'signout'

    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/${signOutUrl}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.token
            },
        })
        .then(() => {
            dispatch({ type: 'USER_LOGGED_OUT' })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
