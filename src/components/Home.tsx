import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import {
  TouchableOpacity,
  FlatList,
  RectButton,
} from "react-native-gesture-handler";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("App");

/**
 * Rendering the view
 */
export default class Home extends Component {
  state = {
    text: "Drinking Game App",
    reasonsArr: [
      { id: 0, text: "he smells" },
      { id: 1, text: "he is bad at C++" },
      { id: 2, text: "nobody really likes him" },
      { id: 3, text: "because me eat burger and angry" },
    ],
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{this.state.text}</Text>
        <View>
          <TouchableOpacity>
            <Text style={styles.title}>
              Reasons why people don't like{" "}
              <Text style={styles.accent}>Ryan</Text>:
            </Text>
          </TouchableOpacity>
          <View style={styles.itemContainer}>
            <FlatList
              data={this.state.reasonsArr}
              renderItem={({ item, index }) => (
                <Row item={item.text} />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

/**
 * Renders a single item in the flatlist
 *
 * @param {String} text
 */
const Item = ({text}: any) => (
  <RectButton style={styles.rectButton}>
    <Text style={styles.fromText}>{text}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      Swipe me left or right
    </Text>
  </RectButton>
);

const Row = ({item}: any) => (
  <AppleStyleSwipeableRow>
    <Item text={item} />
  </AppleStyleSwipeableRow>
)

import { Animated, I18nManager } from "react-native";

import Swipeable from "react-native-gesture-handler/Swipeable";
import Icon from "react-native-vector-icons/MaterialIcons";

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

class AppleStyleSwipeableRow extends Component {
  renderLeftActions = (
    _progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
        extrapolate: string;
      }) => any;
    }
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={styles.leftAction} onPress={this.close}>
        <AnimatedIcon
          name="archive"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    );
  };
  renderRightActions = (
    _progress: any,
    dragX: {
      interpolate: (arg0: {
        inputRange: number[];
        outputRange: number[];
        extrapolate: string;
      }) => any;
    }
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <AnimatedIcon
          name="delete-forever"
          size={30}
          color="#fff"
          style={[styles.actionIcon, { transform: [{ scale }] }]}
        />
      </RectButton>
    );
  };
  updateRef = (ref: any) => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  _swipeableRow: any;
  render() {
    const { children } = this.props;
    return (
      //@ts-ignore
      <Swipeable ref={this.updateRef} friction={2} leftThreshold={80} rightThreshold={40} renderLeftActions={this.renderLeftActions} renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}
