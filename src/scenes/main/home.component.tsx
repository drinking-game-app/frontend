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

import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import Constants from 'expo-constants'
import { Button } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";


/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("App");

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
      <Text style={styles.subTitle}>Server URL - {Constants.manifest.extra.SERVER_URL}</Text>

      <View style={styles.itemContainer}>
        <Button
          style={styles.formButton}
          onPress={() => props.navigation.navigate(AppRoute.AUTH)}
        >
          Host
        </Button>
        <Button style={styles.formButton}>
          Join
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Home