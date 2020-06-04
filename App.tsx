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

import React from "react";

/**
 * Redux dependencies
 */
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./src/reducers";

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
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </Provider>
  );
}
