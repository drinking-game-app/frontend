import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#eae7ba',
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#353232',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row'
  }, 
  item: {
    backgroundColor: 'rgb(187, 192, 247)',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  accent: {
    color: 'rgb(187, 192, 247)',
    fontWeight: 'bold',
  }
});
