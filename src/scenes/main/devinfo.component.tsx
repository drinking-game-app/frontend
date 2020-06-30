/*
 * File: devinfo.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Saturday, 6th June 2020 9:13:05 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Displaying info for developers
 * Last Modified: Saturday, 6th June 2020 9:13:09 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import {
  Layout,
  List,
  ListItem,
  IconProps,
  Icon,
} from "@ui-kitten/components";
import { Platform } from "react-native";
import { ModalHeader } from "../../components/modal-header.component";
import { AppRoute } from "../../navigation/app-routes";
import { DevInfoScreenProps } from "../../navigation/main.navigator";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

// const manifest = require('./../../../app.config.js')

import manifest from './../../variables.json'
import app from './../../../app.json'

const data = [
  { field: "Server URL", value: manifest.SERVER_URL },
  { field: "Build Mode", value: __DEV__ ? "Development" : "Production" },
  { field: "Version", value: app.expo.version },
  { field: "Platform", value: Platform.OS },
];

const DevInfoScreen = (props: DevInfoScreenProps) => {
  const renderItemIcon = (props: IconProps) => (
    <Icon {...props} name="settings-2-outline" />
  );

  const renderData = ({ item }: any) => (
    <ListItem
      title={`${item.field}: ${item.value}`}
      accessoryLeft={renderItemIcon}
    />
  );

  return (
    <Layout style={styles.container}>
      <ModalHeader
        text="Developer Information"
        icon="close-outline"
        status="info"
        onPress={() => props.navigation.navigate(AppRoute.HOME)}
      />
      <List style={styles.listContainer} data={data} renderItem={renderData} />
    </Layout>
  );
};

export default DevInfoScreen;
