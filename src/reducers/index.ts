/**
 * Import modules which can be accessed
 */
import AuthReducer from './AuthReducer'
import GameReducer from './GameReducer'
import { combineReducers } from 'redux'

 /**
 * Combine and Export these modules to the rest of the application
 */
export default combineReducers({auth: AuthReducer, game: GameReducer })