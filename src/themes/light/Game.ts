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
    color: '#222',
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
});
