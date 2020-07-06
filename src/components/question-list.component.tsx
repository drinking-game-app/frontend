import React from 'react'
import { Icon, Text, IconProps, DrawerGroup, DrawerItem, Drawer, Layout, List } from '@ui-kitten/components'
import { View } from 'react-native'
import { IPlayer, IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux'
import { Question, RoundOptions } from '@rossmacd/gamesock-client'
import { ScrollView } from 'react-native-gesture-handler'

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
  roundOptions: RoundOptions | undefined;
}

const QuestionList = (props: IProps) => {

  const [selectedIndex, setSelectedIndex] = React.useState<any>(null);

  const renderItemIcon = (props: IconProps, item: any) => {
    if (item) {
      return (
        <View style={[styles.playerAvatar, { backgroundColor: item.colour }]} >
          <Text category='h4'>{getPlayerInitials(item.name)}</Text>
        </View>
      )
    }
    return (
      <View style={[styles.playerAvatar, { backgroundColor: '#d14688' }]} >
        <Icon {...props} name="shuffle-2-outline" />
      </View>
    )
  }

  const renderIcon = (props: IconProps, name: string) => (
    <Icon {...props} name={name} />
  )

  const getPlayerInitials = (name: string) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  const renderListItem = ({ item }: any) => {
    const player = props.players.find(player => player.id === item.playerId)
    const pointsToPlayers = item.answers?.length === 2 && (item.answers[0] === item.answers[1]) && (item.answers[1] !== null)

    return (
      <Drawer
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        style={styles.listContainer}
      >
        <DrawerGroup
          title={item.question}
          style={styles.listItem}
          accessoryLeft={(props) => renderItemIcon(props, player)}
        >
          <DrawerItem onPress={() => { }} title={player ? `Asked by: ${player.name}` : 'Shuffled Question'} accessoryLeft={(props) => renderIcon(props, 'question-mark-outline')} />
          {
            props.roundOptions?.hotseatPlayers.map((hotseatPlayer, i) => {
              const answer = item.answers![i]
              const questionAnswer = `${answer ? `answered ${answer === i ? 'themself' : props.roundOptions?.hotseatPlayers[i === 0 ? 1 : 0].name}` : 'Didn\'t answer'}`

              return (
                <DrawerItem key={hotseatPlayer.name} onPress={() => { }} title={`${hotseatPlayer.name} ${questionAnswer}`} accessoryLeft={(props) => renderIcon(props, 'edit-2-outline')} />
              )
            })
          }

          <DrawerItem
            onPress={() => { }}
            title={pointsToPlayers
              ? 'Both players got points!'
              : `${player
                ? `${player.name} got points!`
                : 'Nobody got points!'}`}
            accessoryLeft={(props) => renderIcon(props, 'star-outline')}
          />

        </DrawerGroup>
      </Drawer>

    )
  }

  return (
    <Layout>
      {
        props.questions.length > 0
        ? <List
            data={props.questions}
            renderItem={renderListItem}
          />
        : <Text>No Questions Found</Text>
      }
    </Layout>
  )
}

/**
 * Return a list of people from our redux state
 *
 * @param {*} state
 */
const mapStateToProps = (state: IInitialState): IProps => {
  const { players, questions, roundOptions } = state.game;

  return {
    players,
    questions,
    roundOptions
  };
};

export default connect<IProps>(
  mapStateToProps
)(QuestionList);

