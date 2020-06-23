/*
 * File: index.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Theme controller for the light theme
 * Last Modified: Saturday, 16th May 2020 8:58:07 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

/**
 * Import theme modules that are allowed to be accessed
 */
import App from './App';
import Form from './Form'
import Game from './Game'
import Header from './Header'
import Notification from './Notification'

/**
 * Export these modules to the rest of the application
 */
export default {
  App,
  Form,
  Game,
  Header,
  Notification
};
