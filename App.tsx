import React from 'react';
import Navigation from './src/components/Navigation'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './src/reducers/AuthReducer'

/**
 * Initialise redux store
 * Along with the redux dev tools
 */
const store = createStore(reducers, compose(
  //@ts-ignore
  applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))

/**
 * Entry point for the application
 */
export default function App() {
  return <Provider store={store}><Navigation /></Provider>
}