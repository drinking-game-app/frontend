import {StyleSheet} from 'react-native';

/**
 * Rules Stylesheet for the light theme
 */
export default StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D14688',
    padding: 40,
    position: 'relative'
  },
  rulesImage: {
    width: '80%',
    height: '20%'
  },
  rulesContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    backgroundColor: '#D14688'
  },
  ruleHeading: {
    textAlign: 'center'
  },
  ruleDescription: {
    fontSize: 20,
    textAlign: 'center'
  },
  rulesBtn: {
    width: '80%',
    position: 'absolute',
    bottom: 25
  }
});
