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
  lobbyCode: string;
}

export const ModalHeaderLobby = ({
  text,
  icon,
  buttonText,
  loading = false,
  lobbyCode,
  isLeaderboard = false,
  ...ButtonProps
}: ModalHeaderProps): ButtonElement => {
  const spinnerIcon = () => (
    <View>
      <Spinner size="small" status="danger" />
    </View>
  );

  const buttonIcon = (props: IconProps) => {
    if (!loading) return <Icon {...props} name={icon} size="large" />;

    return spinnerIcon();
  };

  const renderTitleAndCode = () => {
    /**
     * If it is a leaderboard screen, render only the title
     */
    if (isLeaderboard)
      return (
        <Text style={[styles.title, styles.leaderboardTitle]} category="h1">
          {text}
        </Text>
      );

    /**
     * If not, render the title and the lobby code
     */
    return (
      <React.Fragment>
        <Text style={styles.title} category="h1">
          {lobbyCode !== "" ? text : "Loading lobby..."}
        </Text>
        <Text style={styles.title}>{lobbyCode}</Text>
      </React.Fragment>
    );
  };

  return (
    <View style={styles.container}>
      <Button
        {...ButtonProps}
        accessoryRight={buttonIcon}
        style={styles.button}
        size="tiny"
      >
        {buttonText}
      </Button>
      {renderTitleAndCode()}
    </View>
  );
};
