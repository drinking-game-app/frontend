import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  listContainer: {
    maxHeight: 500
  },
  submitButton: {
    marginVertical: 24,
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
