import React from 'react'
import { List } from '@ui-kitten/components'
import { IPlayer, IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux'
import PlayerSingle from './player-single.component'

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
  editPage: (id: string) => void
}

/**
 * Interface for props
 * being passed from the redux store
 */
interface IReduxProps {
  players: IPlayer[];
  roundOver: boolean;
}

const PlayerList = (props: IProps & IReduxProps) => {

  const renderItem = ({ item }: any) => (
    <PlayerSingle item={item} roundOver={props.roundOver} editPage={(id: string) => props.editPage(id)} />
  )

  let players: IPlayer[] = props.players;
  if (players.length < 4) {
    const length = 4 - players.length
    players = [
      ...players,
      ...new Array(length).fill({ name: "Waiting for player...", colour: '#161f26', icon: 'question-mark-outline' }),
    ];
  }
  if (props.roundOver) {
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
const mapStateToProps = (state: IInitialState): IReduxProps => {
  const { players, roundOver } = state.game;

  return {
    players,
    roundOver
  };
};

export default connect<IReduxProps>(
  mapStateToProps
)(PlayerList);

