
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
