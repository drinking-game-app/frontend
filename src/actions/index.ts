

const prefix = "/api/user"
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
 * Type for form update prop
 */
interface IForm {
    [prop: string]: string
}

/**
 * Updates an item in the redux store
 * 
 * @param {prop, value} param
 */
export const formUpdate = ({prop, value}: IForm) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value }
    }
}

/**
 * Type for registering user body
 */
interface ICreate {
    name: string
    email: string
    password: string
}

/**
 * Register a user
 * 
 * @param {name: string, email: string, password: string} body
 */
export const create  = (body: ICreate) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${prefix}`, {
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
        })
    }
}

/**
 * Type for login user body
 */
interface ILogin {
    email: string
    password: string
}

/**
 * Login
 * 
 * @param {email: string, password: string} body 
 */
export const login  = (body: ILogin) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}/api/auth/signin`, {
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
            console.log(data, 'data!')
            dispatch({ type: 'USER_LOGGED_IN', payload: data.data })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

/**
 * Type for an authentication token
 */
interface IToken {
    t: string
}

/**
 * Logout a user
 * 
 */
export const logout  = (credentials: IToken) => {
    return (dispatch: any) => {
        fetch(`${baseUrl}${prefix}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
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
