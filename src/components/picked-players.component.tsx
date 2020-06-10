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
import { View} from "react-native";
import { Player, Question } from "@rossmacd/gamesock-client";

/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Game");

/**
 * Interface actions
 * for the component
 */
interface IActions {
    answerQuestion?: (questionIndex: number, playerId: number) => void;
}

 /**
 * Interface for props being
 * passed to to the picked players component
 */
interface IProps {
    players: [Player, Player] | undefined;
    question?: Question;
    questionIndex?: number;
    user: Player;
    canAnswer?: boolean;
}

const PickedPlayers = (props: IProps & IActions) => {
    const canSelectAnswer = props.players?.some(player => player.id === props.user.id)

    /**
     * When a player selects an answer
     * 
     * @param {number} i
     */
    const onSelectPlayer = (i: number) => {
        if(canSelectAnswer && props.canAnswer && props.answerQuestion) {
            props.answerQuestion(props.questionIndex!, i)
        }
    }

    /**
     * Renders the text title for ingame picked players
     */
    const renderTextTitle = () => {
        if(props.question?.question) return (
            <React.Fragment>
                <Text>{canSelectAnswer ? 'Answer the following question:' : 'Waiting for players to answer:'}</Text>
                <Text style={styles.title}>{props.canAnswer ? props.question.question : 'Waiting for next question...'}</Text>
            </React.Fragment>
        )

        return (
            <Text style={styles.title}>Picked Players</Text>
        )
    }

    return (
     <Layout style={styles.container}>
         <Text>{`Can Answer: ${props.canAnswer}`}</Text>
         {renderTextTitle()}
         
         <View style={styles.pickedPlayerContainer}>
            {props.players?.map((player, i) => {
                const isPlayer = player.id === props.user.id
                return (
                    <View style={styles.pickedPlayer} key={i}>                            
                            <Card style={[styles.pickedPlayerCard, i === 0 ? styles.cardPink : styles.cardPurple]} onPress={() => onSelectPlayer(i)}>
                                <Text style={styles.title}>{player.name}</Text>
                            </Card>
                    <Text style={[styles.belowCardText, i === 0 ? styles.alignLeft : styles.alignRight ]} appearance='hint'>{player.name} {isPlayer ? '(You)' : ''}</Text>
                    </View>
                )
            })}
         </View>
     </Layout>   
    )
}


export default PickedPlayers
