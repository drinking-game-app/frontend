/*
 * File: host.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 3rd June 2020 2:52:35 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Hosting a game
 * Last Modified: Wednesday, 3rd June 2020 2:53:50 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { HostGameScreenProps } from "../../navigation/game.navigator";
import { Layout, Button } from "@ui-kitten/components";
import { Text } from "react-native";
import { AppRoute } from "../../navigation/app-routes";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

const HostScreen = (props: HostGameScreenProps) => {
    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Host</Text>
            <Button style={styles.submitButton} onPress={() => props.navigation.navigate(AppRoute.HOME)}>Home</Button>
            <Button style={styles.submitButton} onPress={() => props.navigation.navigate(AppRoute.SIGN_OUT)}>Sign out page</Button>
        </Layout>
    )
}

export default HostScreen