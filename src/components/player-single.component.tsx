import React from 'react'
import { ListItem, Icon, Text, IconProps, Button } from '@ui-kitten/components'
import { View } from 'react-native'
import { IPlayer, IInitialState } from '../reducers/interfaces'
import { connect } from 'react-redux';

/**
 * Importing styles
 * @param theme path
 * @param Game Module name
 */
const styles = require("../themes")("Game");

/**
 * Interface for props being
 * passed to to the single player component
 */
interface IProps {
  item: IPlayer;
  roundOver: boolean;
  editPage: (id: string) => void;
}

/**
 * Interface for redux props being
 * passed to to the single player component
 */
interface IReduxProps {
  user: IPlayer
}

const PlayerSingle = ({ item, roundOver, editPage, user }: IProps & IReduxProps) => {
  const renderItemIcon = (props: IconProps, item: any) => {
    return (<View style={[styles.playerAvatar, { backgroundColor: item.colour }]} >
      {
        item.icon
          ? <Icon {...props} name={item.icon} />
          : <Text category='h4'>{getPlayerInitials(item.name)}</Text>
      }
    </View>)
  }

  const renderEditIcon = (props: IconProps) => (
    <Icon {...props} name={"edit-outline"} />
  )

  const renderEditModal = () => {
    if (item.id === user.id) {
      return <Button accessoryLeft={renderEditIcon} onPress={() => editPage(item.id)}></Button>
    }
    return <></>
  }

  const getPlayerInitials = (name: string) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  }

  const renderListItemPoints = (score: number) => {
    return (
      <React.Fragment>
        {renderEditModal()}
        <Text>{score} points</Text>
      </React.Fragment>
    )
  }

  if (roundOver) return <ListItem style={styles.listItem} title={item.name} accessoryLeft={(props) => renderItemIcon(props, item)} accessoryRight={() => renderListItemPoints(item.score)} />

  return <ListItem style={[styles.listItem, { color: 'red' }]} title={item.name} accessoryLeft={(props) => renderItemIcon(props, item)} accessoryRight={() => renderEditModal()} />
}

const mapStateToProps = (state: IInitialState): IReduxProps => {
  const { user } = state.game;

  return { user };
};

export default connect(mapStateToProps)(PlayerSingle)
