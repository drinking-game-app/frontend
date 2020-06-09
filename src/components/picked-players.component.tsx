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

import { IPlayer, IQuestion } from "../reducers/interfaces";
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
    answerQuestion?: ({ question }: IQuestion) => void;
}

 /**
 * Interface for props being
 * passed to to the picked players component
 */
interface IProps {
    players: [Player, Player] | undefined;
    question?: Question
    user: Player
}

const PickedPlayers = (props: IProps & IActions) => {
    const canAnser = props.question && props.question.question

    const onSelectPlayer = (player: Player, i: number) => {
        if(canAnser && props.answerQuestion) {
            let question = props.question
            // question.answers = i
            props.answerQuestion(question)
        }
    }

    // const title = props.question && props.question.question
    // ? props.question.question
    // : "Picked Players"

    return (
     <Layout style={styles.container}>
         <Text style={styles.title}>{canAnser ? props.question?.question : "Picked Players"}</Text>
         
         <View style={styles.pickedPlayerContainer}>
            {props.players?.map((player, i) => {
                return (
                    <View style={styles.pickedPlayer} key={i}>                            
                            <Card style={[styles.pickedPlayerCard, i === 0 ? styles.cardPink : styles.cardPurple]} onPress={() => onSelectPlayer(player, i)}>
                                <Text style={styles.title}>{player.name}</Text>
                            </Card>
                    <Text style={[styles.belowCardText, i === 0 ? styles.alignLeft : styles.alignRight ]} appearance='hint'>{player.name} {player.id === props.user.id ? '(You)' : ''}</Text>
                    </View>
                )
            })}
         </View>
     </Layout>   
    )
}


export default PickedPlayers

