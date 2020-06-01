/*
 * File: Home.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Monday, 11th May 2020 11:36:00 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: A simple static page to demonstrate some features of react native
 * Last Modified: Saturday, 16th May 2020 8:57:16 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("App");

/**
 * Rendering the view
 */

const Home = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text style={styles.subTitle}>
        Application Running in {__DEV__ ? "Development" : "Production"} mode
      </Text>
      <View style={styles.itemContainer}>
        <RectButton
          style={styles.formButton}
          onPress={() => props.navigation.navigate("Authenticate")}
        >
          <Text>Host</Text>
        </RectButton>
        <RectButton style={styles.formButton}>
          <Text>Join</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Home