/**
 * Interface for a user
 */
interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

/**
 * Interface for a reducer action
 */
interface IAction {
  type: string;
  payload: {
    prop: string;
    value?: string;
    user?: IUser;
    token?: string;
    error?: string;
  };
}

/**
 * Interface for the initial state
 */
interface IInitialState {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  toRegister: boolean;
  canSubmit: boolean;
  token: string;
  actionSuccess: boolean;
  error: string;
}

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
  error: ""
};

/**
 * Reducers for authentication
 */
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case "IS_REGISTERING":
      return {
        ...state,
        toRegister: !state.toRegister,
      };
    case "FORM_UPDATE":
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case "USER_REGISTERED":
      return {
        ...state,
        toRegister: false,
        name: "",
        password: "",
        actionSuccess: true,
        error: ""
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        error: action.payload.error
      }
    case "USER_LOGGED_IN":
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.user.name,
        email: action.payload.user.email,
        _id: action.payload.user._id
      };
    case "USER_LOGGED_OUT":
      return {
        ...state,
        token: "",
        user: {
          _id: "",
          name: "",
          email: "",
          password: "",
        },
      };
    default:
      return state;
  }
};
