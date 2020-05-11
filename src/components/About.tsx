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
