/*
 * File: lobby.component.tsx
 * Project: frontend
 * Version: 1.0.0
 * File Created: Wednesday, 3rd June 2020 2:52:35 pm
 * Author: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * File Description: In game lobby for both host and players
 * Last Modified: Wednesday, 3rd June 2020 3:00:55 pm
 * Modified By: Eoan O'Dea - eoan@wspace.ie
 * ---------------
 * Copyright 2020 - WebSpace
 */

import React from "react";
import { Icon, ListItem, List, IconProps } from "@ui-kitten/components";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../../themes")("Game");

/**
 * Interface for a single player
 */
interface IPlayer {
    name: string
}

/**
 * Interface for props being 
 * passed to to the lobby component
 */
interface IProps {
    players: IPlayer[]
}

const Lobby = (props: IProps) => {
    const renderItemIcon = (props: IconProps) => (
        <Icon {...props} name="person" />
    )

    const renderItem = ({item}: any) => (
        <ListItem
            title={item.name}
            accessoryLeft={renderItemIcon}
        />
    )
    
    let players: IPlayer[] = props.players
    if(players.length < 4) players = [...players, ...new Array(3).fill({name: 'Waiting for player...'})]
    
    return (
        <List
            style={styles.listContainer}
            data={players}
            renderItem={renderItem}
        />
    )
}

export default Lobby