/*
 * File: App.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 26th October 1985 9:15:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Primary entrypoint for the application
 * Last Modified: Saturday, 16th May 2020 9:00:50 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React, { useEffect } from "react";

/**
 * Redux dependencies
 */
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./src/reducers";
import Constants from 'expo-constants';

/**
 * Navigation dependencies & modules
 */
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from "./src/navigation/app.navigator";

/**
 * UI & Component Library dependencies
 */
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
// Crash monitoring
import rg4js from 'raygun4js';
/**
 * Custom UI Component theming
 */
import { default as theme } from './src/assets/custom-theme.json';


/**
 * Initialise redux store
 * Along with the redux dev tools
 */
const store = createStore(
  reducers,
  compose(
    //@ts-ignore
    applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
  )
);

/**
 * Entry point for the application
 */
export default function App() {
  useEffect(() => {
    rg4js('enableCrashReporting', true);
    rg4js('apiKey', 'bFCdvDJJcwGct6nwxT3EQ');
    // rg4js('enablePulse', true); // This will enable user monitoring on web only does not work with react native
    // Tag that it is a client and tag the server that crashed - this can be used to seperate prod and dev
    rg4js('withTags', ['React-Native', Constants.manifest.extra.SERVER_URL]);
    //@ts-ignore This is a real function but its not in the types 🤷‍♂️
    // rg4js('boot'); // This call must be made last to start the provider
  }, [])
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  );
}

