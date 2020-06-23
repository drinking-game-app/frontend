import React from 'react'
import { ListItem, Icon, Text, IconProps, List } from '@ui-kitten/components'
import { View } from 'react-native'
import { IPlayer, IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux'
import { Question } from '@rossmacd/gamesock-client'

/**
 * Importing styles
 * @param theme path
 * @param Game Module name
 */
const styles = require("../themes")("Game");

/**
 * Interface for props being
 * passed to to the player list component
 */
interface IProps {
    players: IPlayer[];
    questions: Question[];
}

const QuestionList = (props: IProps) => {

    const renderItemIcon = (props: IconProps, item: any) => {

        return (<View style={[styles.playerAvatar, {backgroundColor: item.colour}]} >
            <Text category='h4'>{getPlayerInitials(item.name)}</Text>
        </View>)
      }
    
      const getPlayerInitials = (name: string) => {
        const initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
      }
    
      const renderListItemPoints = (score: number) => (
        <Text>{score} points</Text>
      )
    
      const renderItem = ({item}: any) => {
        // if(props.roundOver) return <ListItem style={styles.listItem} title={item.name} accessoryLeft={(props) => renderItemIcon(props, item)} accessoryRight={() => renderListItemPoints(item.score)} />
        const player = props.players.find(player => player.id === item.playerId)
    
    
        return <ListItem style={[styles.listItem]} title={item.question} accessoryLeft={(props) => renderItemIcon(props, player)} />
      }


    if(props.questions.length > 0) {
        return (
            <List
                style={styles.listContainer}
                data={props.questions}
                renderItem={renderItem}
            />
        )
    }

    return <Text>No Questions Found</Text>
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { players, questions } = state.game;
  
    return {
      players,
      questions
    };
  };
  
  export default connect<IProps>(
    mapStateToProps
  )(QuestionList);
  
