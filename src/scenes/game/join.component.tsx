/*
 * File: join.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 3rd June 2020 2:52:35 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Joining a game
 * Last Modified: Wednesday, 3rd June 2020 3:14:57 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { JoinGameScreenProps } from "../../navigation/game.navigator";
import { Layout, Button } from "@ui-kitten/components";
import { Text } from "react-native";
import Lobby from "./lobby.component";
import { AppRoute } from "../../navigation/app-routes";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

interface IPlayer {
    name: string
}


const playersArr: IPlayer[] = [
    {
        name: 'John'
    },
    {
        name: 'Ross'
    },
    {
        name: 'Sue Reardon'
    },
]

const JoinScreen = (props: JoinGameScreenProps) => {
    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Join</Text>
            <Button style={styles.submitButton} onPress={() => props.navigation.navigate(AppRoute.HOME)}>Home</Button>
            <Lobby players={playersArr} />
        </Layout>
    )
}

export default JoinScreen