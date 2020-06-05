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
    // backgroundColor: "#100241",
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
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
    marginVertical: 24
  }
});
