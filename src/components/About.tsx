/*
 * File: About.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: A simple static page to demonstrate React native
 * Last Modified: Saturday, 16th May 2020 8:57:01 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



import React from "react";
import { Text, SafeAreaView } from "react-native";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("App");

export default () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>
      Waiting for John Ramos to work his magic 🦆
    </Text>
  </SafeAreaView>
);
