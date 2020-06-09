import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    paddingVertical: 16,
    // paddingHorizontal: 16,
    flexDirection: "column-reverse",
    justifyContent: 'space-between'
  },
  title: {
    paddingVertical: 32,
    color: '#D7D98B',
    fontWeight: '400',
    textAlign: 'left',
    alignItems: "flex-start",
  },
  leaderboardTitle: {
    color: 'pink',
  },
  button: {
    // alignItems: "flex-end",
    // marginLeft: 'auto'
    // maxWidth: '30%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    border: 0,
    // marginLeft: 50,
  }
});
