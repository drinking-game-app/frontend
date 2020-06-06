import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: '#161F26',
  },

  title: {
    // paddingHorizontal: 16,
    paddingTop: '37%',
    paddingBottom: '20%',
    color: '#D7D98B',
    fontSize: 45,
    fontWeight: '400',
    textAlign: 'center',
  },

  titleRed: {
    // paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#AD0D4B',
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'center',
  },

  subTitle: {
    textAlign: 'center',
  },

  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formButton:{
    marginVertical: 10,
    paddingHorizontal: 150,
    backgroundColor: '#AD0D4B',
    border: 'none',
    width: '100%',
    height: '100%',
  }
});
