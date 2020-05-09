import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fdf6e3',
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#657b83',
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  accent: {
    color: '#C53F37',
    fontWeight: 'bold',
  }
});
