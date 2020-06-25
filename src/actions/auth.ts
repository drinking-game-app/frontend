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

import { ICreate, IForm, ILogin, IThirdPartyToken } from "./interfaces"
import Constants from "expo-constants";
import { hostGame } from "./game";
import AsyncStorage from "@react-native-community/async-storage";
import { Dispatch } from "redux";

/**
 * Prefixes for api endpoints
 */
const userPrefix = "/api/user"
const authPrefix = "/api/auth"

/**
 * Get the baseURL for the server either from the .env file
 * or use a static IP
 */
console.log('server url!!' , Constants.manifest.extra.SERVER_URL)
const baseUrl = Constants.manifest.extra.SERVER_URL || 'http://192.168.0.164:3000'

const lobbyName = "HK4J"

/**
 * Determinds whether to display the login
 * or register view
 */
export const setLoading = () => {
    return {
        type: 'IS_LOADING'
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
            
            dispatch({ type: 'USER_REGISTERED', payload: {user: data.data} })
        })
        .catch((err) => {
            console.log(err)
            return dispatch({ type: 'REQUEST_ERROR', payload: {error: 'Error: Could not connect to the server'} })
        })
    }
}

export const getUser = (token: string) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then((data) => {
            if(data.error) {
                return dispatch({ type: 'REQUEST_ERROR', payload: data })
            }
            const payload = {
                token: token,
                ...data.data
            }
            // AsyncStorage.setItem('token', data.data.token)
            dispatch({ type: 'USER_LOGGED_IN', payload })
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

            AsyncStorage.setItem('token', data.data.token).catch(e=>console.log(e))
            dispatch({ type: 'USER_LOGGED_IN', payload: data.data })
            // dispatch(hostGame({username: data.data.user.name, token: data.data.token}))
            hostGame({username: data.data.user.name, token: data.data.token},dispatch)
            // dispatch({ type: 'HOST_GAME', payload: {username: data.data.user.name, token: data.data.token} })
        })
        .catch((err) => {
            console.log(err)
            return dispatch({ type: 'REQUEST_ERROR', payload: {error: 'Error: Could not connect to the server'} })
        })
    }
}

/**
 * Login with a third party system
 * 
 * -Google
 * -Apple (iOS only)
 * 
 * @param {IToken} token 
 */
export const loginWithThirdParty  = (token: IThirdPartyToken) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/signin/${token.provider}/${token.type}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token)
        })
        .then(response => response.json())
        .then((data) => {
            console.log('response!', data)
            if(data.error || data.success !== true) {
                return dispatch({ type: 'REQUEST_ERROR', payload: data })
            }

            AsyncStorage.setItem('token', data.data.token)

            if(data.data.user.accessToken) dispatch({ type: 'USER_LOGGED_IN_GOOGLE_MOBILE', payload: data.data })
            else dispatch({ type: 'USER_LOGGED_IN_GOOGLE', payload: data.data })

            hostGame({username: data.data.user.name, token: data.data.token}, dispatch)
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
export const logout  = (credentials: IThirdPartyToken) => {
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
            AsyncStorage.removeItem('token')
            dispatch({ type: 'USER_LOGGED_OUT' })
        })
        .catch((err) => {
            console.log('Logout Error', err)
        })
    }
}
