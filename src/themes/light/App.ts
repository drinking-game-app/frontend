import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  tab: {
    // height: 192,
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D14688'
  },
  rulesContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    backgroundColor: '#D14688'
  },
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
    // paddingBottom: 82,
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
    paddingHorizontal: 120,
    paddingVertical: 50,
    backgroundColor: '#AD0D4B',
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
    // width: '80%',
    // marginHorizontal: 'auto'
  },

  formButtonAlternate:{
    marginVertical: 10,
    paddingHorizontal: 120,
    paddingVertical: 50,
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
    backgroundColor:'#00B0FF'
  },


  signOutAndCogContainer: {
    position: 'absolute',
    top: 50,
    width: '95%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  signOutBtn: {
    backgroundColor: '#AD0D4B',
    borderWidth: 0,
  }
});
