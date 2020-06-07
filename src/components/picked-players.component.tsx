/*
 * File: picked-players.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Friday, 5th June 2020 11:13:02 am
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: Component for picked players during a game
 * Last Modified: Friday, 5th June 2020 11:13:07 am
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import { IPlayer } from "../reducers/interfaces";
import { Layout, Card, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Game");

 /**
 * Interface for props being
 * passed to to the picked players component
 */
interface IProps {
    players: IPlayer[];
}

const PickedPlayers = (props: IProps) => {
    return (
     <Layout style={styles.container}>
         <Text style={styles.title}>Picked Players</Text>
         <View style={styles.pickedPlayerContainer}>
            {props.players.map((player, i) => {
                return (
                    <View key={i} style={styles.pickedPlayer}>
                        <Card style={[styles.pickedPlayerCard, i === 0 ? styles.cardPink : styles.cardPurple]}>
                            <Text style={styles.title}>{player.name}</Text>
                        </Card>
                        <Text style={[styles.belowCardText, i === 0 ? styles.alignLeft : styles.alignRight ]} appearance='hint'>{i === 0 ? 'You' : player.name}</Text>
                    </View>
                )
            })}
         </View>
     </Layout>   
    )
}

export default PickedPlayers

