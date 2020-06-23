import React from 'react'
import { ListItem, Icon, Text, IconProps, List } from '@ui-kitten/components'
import { View } from 'react-native'
import { IPlayer, IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux'

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
    roundOver: boolean;
}

const PlayerList = (props: IProps) => {

    const renderItemIcon = (props: IconProps, item: any) => {
        return (<View style={[styles.playerAvatar, {backgroundColor: item.colour}]} >
          {
            item.icon
            ? <Icon {...props} name={item.icon} />
            : <Text category='h4'>{getPlayerInitials(item.name)}</Text>
          }
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
        if(props.roundOver) return <ListItem style={styles.listItem} title={item.name} accessoryLeft={(props) => renderItemIcon(props, item)} accessoryRight={() => renderListItemPoints(item.score)} />
    
    
        return <ListItem style={[styles.listItem, {color: 'red'}]} title={item.name} accessoryLeft={(props) => renderItemIcon(props, item)} />
      }

    let players: IPlayer[] = props.players;
    if (players.length < 4)
      players = [
        ...players,
        ...new Array(3).fill({ name: "Waiting for player...", colour: '#161f26', icon: 'question-mark-outline' }),
      ];
    if(props.roundOver) {
      players.sort((a, b) => b.score - a.score)
    }


    return (
        <List
            style={styles.listContainer}
            data={players}
            renderItem={renderItem}
        />
    )
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
    const { players, roundOver } = state.game;
  
    return {
      players,
      roundOver
    };
  };
  
  export default connect<IProps>(
    mapStateToProps
  )(PlayerList);
  
