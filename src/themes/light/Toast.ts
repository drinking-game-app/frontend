import {StyleSheet} from 'react-native';

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
    modal: {
        position: "absolute",
        bottom: "5%",
        right: '6%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ad0d4b',
        borderWidth: 0,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 2, height: 2},
        borderRadius: 5,
    },
    modalDismiss: {
        maxWidth: 10,
        borderColor: '#fff0',
        backgroundColor: '#fff0'
    }
})