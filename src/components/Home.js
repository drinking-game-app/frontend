import React from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("App");

const reasonsArr = [
  { id: 0, text: "he smells" },
  { id: 1, text: "he is bad at C++" },
  { id: 2, text: "nobody really likes him" },
  { id: 3, text: "because me eat burger and angry" },
];

/**
 * Rendering the view
 */
export default () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Drinking Game App</Text>
    <View>
      <TouchableOpacity>
        <Text style={styles.title}>
          Reasons why people don't like <Text style={styles.accent}>Ryan</Text>:
        </Text>
      </TouchableOpacity>
      <View style={styles.itemContainer}>
        <FlatList
          data={reasonsArr}
          renderItem={({ item }) => <Item text={item.text} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  </SafeAreaView>
);

/**
 * Renders a single item in the flatlist
 * 
 * @param {String} text
 */
function Item({ text }) {
  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
