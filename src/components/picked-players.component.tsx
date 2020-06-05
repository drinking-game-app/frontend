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
import { Layout, Card } from "@ui-kitten/components";
import { Text } from "react-native";
import React from "react";


 /**
 * Interface for props being
 * passed to to the picked players component
 */
interface IProps {
    players: IPlayer[];
}

const PickedPlayers = (props: IProps) => {
    return (
     <Layout>
         {props.players.map((player, i) => {
             <React.Fragment key={i}>
                <Card>
                    <Text style={styles.title}>{player.name}</Text>
                </Card>
                <Text>{i === 0 ? 'You' : player.name}</Text>
             </React.Fragment>
         })}
     </Layout>   
    )
}

export default PickedPlayers

