/*
 * File: interfaces.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 16th May 2020 8:44:47 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Interfaces for auth actions
 * Last Modified: Saturday, 16th May 2020 8:55:03 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */


/**
 * Type for form update prop
 */
export interface IForm {
    [prop: string]: string
}

/**
 * Type for registering user body
 */
export interface ICreate {
    name: string
    email: string
    password: string
}

/**
 * Type for login user body
 */
export interface ILogin {
    email: string
    password: string
}

/**
 * Type for an authentication token
 */
export interface IToken {
    token: string
}

interface IAppleLoginUser {
    email: string;
    name: string;
    identityToken: string;
}

/**
 * Type for a google authentication token
 */
export interface IThirdPartyToken {
    token: string;
    accessToken?: string;
    provider: string;
    type: string;
    user?: IAppleLoginUser
}