import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#222',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subTitle: {
    textAlign: 'center'
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formButton:{
    width: 150,
    height: 35,
    backgroundColor: '#add8e6',
    margin: 15,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
  }
});
