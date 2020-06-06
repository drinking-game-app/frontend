import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  button: {
    alignItems: "flex-end",
    // maxWidth: '30%',
    marginLeft: 'auto'
  }
});
