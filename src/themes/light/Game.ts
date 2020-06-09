import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    backgroundColor: '#161F26',
  },

  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  listContainer: {
    paddingHorizontal: 16,
    maxHeight: 700,
    backgroundColor: '#161F26',
  },

  listItem: {
    paddingVertical: 20, 
    fontSize: 30, 
    backgroundColor: '#161F26',
  },

  submitButton: {
    // marginVertical: 24,
    // borderTopLeftRadius: 75,
    // borderTopRightRadius: 75,
    // overflow: 'hidden',
    height: 150,
    alignSelf: 'stretch',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderRadius: 0.01,
  },

  pickedPlayerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',  
  },

  pickedPlayer: {
    width: '48%',
  },

  pickedPlayerCard: {
    height: 150,
    display: 'flex',
    justifyContent: 'center'
  },

  cardPink: {
    backgroundColor: '#AD0D4B'
  },

  cardPurple: {
    backgroundColor: '#9F37DE'
  },

  belowCardText: {
    marginVertical: 10
  },

  alignLeft: {
    color: '#AD0D4B'
  },

  alignRight: {
    color: '#9F37DE',
    textAlign: 'right'
  },

  gameLoadingSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30
  }
});
