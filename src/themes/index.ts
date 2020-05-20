/*
 * File: index.ts
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Primary theme controller for the application
 * Last Modified: Saturday, 16th May 2020 8:59:09 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

/**
 * The name of the theme (folder)
 */
const theme = "light"

/**
 * Aquire the styles from that theme
 */
const styles = require(`./${theme}`).default;

/**
 * Export the theme to the rest of the application
 */
module.exports = (fileName: string | number) => styles[fileName] || {};
