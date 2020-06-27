import React from "react";
import { Text } from "@ui-kitten/components";
import { IInitialState } from "../reducers/interfaces";
import { RoundOptions, Question } from "@rossmacd/gamesock-client";
import { connect } from "react-redux";


/**
 * Importing styles
 * @param theme path
 * @param App Module name
 */
const styles = require("../themes")("Game");


/**
 * Interface for props being
 * passed to to the answers component
 */
interface IProps {
    questions: Question[];
    currentQuestionId: number;
    roundOptions: RoundOptions | undefined;
}

const Answers = (props: any) => {
    return (
        <React.Fragment>
            {props.questions[props.currentQuestionId].answers!.map(
                (answer: number, i: number) => {
                    if (answer !== null)
                        return (
                            <Text key={i} style={[i === 0 ? styles.answerLeft : styles.answerRight]}>
                                {`SELECTED ${answer === i ? "THEMSELVES!" : props.roundOptions?.hotseatPlayers[i === 0 ? 1 : 0].name}`}
                            </Text>
                        );

                    return (
                        // Text for when chosen players didn't choose a player:
                        <Text key={i} style={[styles.pleadTheFifth, i === 0 ? styles.pleadAlignLeft : styles.pleadAlignRight]}>
                            {`pleaded the 5th`}
                        </Text>
                    );
                }
            )}
        </React.Fragment>
    );
}


/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const {
        questions,
        roundOptions,
        currentQuestionId
    } = state.game

    return {
        questions,
        roundOptions,
        currentQuestionId
    }
}

export default connect<IProps>(
    mapStateToProps
)(Answers);