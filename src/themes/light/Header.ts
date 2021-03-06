import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    // paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: 'space-between'
  },

  title: {
    // paddingVertical: 32,
    paddingTop: 32,
    color: 'white',
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 18,
  },

  codeTitle: {
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 45,
    color: '#D7D98B',
  },

  leaderboardTitle: {
    fontSize: 36,
    fontWeight: '200',
    color: '#FFF',
  },

  button: {
    margin: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-start'
  }
});
