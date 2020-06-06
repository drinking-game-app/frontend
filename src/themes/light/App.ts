import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#161F26',
    position: 'relative'
  },

  title: {
    // paddingHorizontal: 16,
    // paddingTop: '37%',
    paddingVertical: 32,
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
    paddingVertical: 30,
    backgroundColor: '#AD0D4B',
    width: '100%',
  },

  signoutAndCogContainer: {
    position: 'absolute',
    top: 50,
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
