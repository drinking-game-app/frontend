import {StyleSheet} from 'react-native';
import { I18nManager } from 'react-native';


/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffd14d',
  },
  title: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: '#ff004d',
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
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#388e3c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse'
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end'
  }
});
