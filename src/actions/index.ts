import { ICreate, IForm, ILogin, IToken } from "./interfaces"

/**
 * Prefixes for api endpoints
 */
const userPrefix = "/api/user"
const authPrefix = "/api/auth"

/**
 * Get the baseURL for the server either from the .env file
 * or use a static IP
 */
const baseUrl = process.env.SERVER_URL || 'http://192.168.0.164:3000'

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
 * Logout a user
 * 
 * @param {IToken} credentials
 */
export const logout  = (credentials: IToken) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${authPrefix}/signout`, {
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
