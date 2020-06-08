/*
 * File: modal-header.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 6th June 2020 9:19:42 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Component to handle the header of components with close buttons
 * Last Modified: Saturday, 6th June 2020 9:41:26 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */



import React from "react";
import {
  Button,
  ButtonElement,
  ButtonProps,
  IconProps,
  Icon,
  Text,
  Spinner,
} from "@ui-kitten/components";
import { View } from "react-native";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Header");

interface ModalHeaderProps extends ButtonProps {
  text: string;
  icon: string;
  buttonText?: string;
  loading?: boolean;
  isLeaderboard?: boolean;
}

export const ModalHeader = ({
  text,
  icon,
  buttonText,
  loading = false,
  isLeaderboard = false,
  ...ButtonProps
}: ModalHeaderProps): ButtonElement => {

  
  const buttonIcon = (props: IconProps) => {
    if(!loading) return <Icon {...props} name={icon} size="large" />

    return (
      <View>
          <Spinner size="small" status="danger" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, isLeaderboard && styles.leaderboardTitle]} category="h1">
        {text}
      </Text>

      <Button
        {...ButtonProps}
        accessoryRight={buttonIcon}
        appearance="ghost"
        style={styles.button}
      >{buttonText}</Button>
    </View>
  );
};
