import { StyleSheet } from "react-native";

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  /**
   * ------GLOBAL STYLING FOR GAME PAGES------ 
   */
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    paddingTop: 32,
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    backgroundColor: "#161F26",
    position: 'relative'
  },

  gameLoadingSpinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingSpinner: {
    marginVertical: 20,
  },

  /**
   * ------LOBBY (GLOBAL)------
   */
  listContainer: {
    paddingHorizontal: 16,
    backgroundColor: "#161F26",
    zIndex: 0
  },

  listItem: {
    paddingVertical: 20,
    fontSize: 30,
    backgroundColor: "#161F26",
  },

  playerAvatar: {
    paddingVertical: 8,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    textAlign: 'center',
    color: '#fff'
  },

  /**
   * ------LOBBY (HOST)------
   */
  submitButton: {
    height: 150,
    alignSelf: "stretch",
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderRadius: 0.01,
    borderColor: "#ffffff00",
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    left: 0,
    width: '100%'
  },

  /**
   * ------LOBBY (JOIN)------
   */
  submitButtonJoined: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: "10%",
    borderTopStartRadius: 0.001,
    borderBottomStartRadius: 0.001,
    borderRadius: 0.001,
    borderColor: "#ffffff00",
  },

  /**
   * ------IN-GAME (GLOBAL)------
   */
  title: {
    paddingHorizontal: 16,
    fontSize: 28,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
  },

  titleChosenYellow: {
    fontSize: 36,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
    color: "#D7D98B",
  },

  titleChosenRed: {
    fontSize: 36,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 20,
    color: "#AD0D4B",
  },

  // answers: {
  //   fontSize: 24,
  //   fontWeight: "300",
  //   position: "relative",
  //   marginVertical: 30,
  // },

  // '@keyframes slideInLeft': {
  //   from: {width: '0%'},
  //   to: {width: '100%'}
  // },

  answerLeft: {
    // transition: '.2s ease',

    position: 'absolute',
    left: 0,
    top: '20%',

    alignItems: "flex-start",
    justifyContent: "flex-start",

    // fontSize: 24,
    fontSize: 18,
    fontWeight: "300",
    textAlign: "left",
    marginVertical: 30,

    alignSelf: "flex-start",
    padding: 10,
    borderTopEndRadius: 0.001,
    borderBottomEndRadius: 0.001,
    borderRadius: 0.001,
    backgroundColor: "#AD0D4B",
    borderColor: "#ffffff00",
  },

  answerRight: {
    // transition: '.2s ease',

    position: 'absolute',
    right: 0,
    bottom: '20%',
    
    alignItems: "flex-end",
    justifyContent: "flex-end",

    // fontSize: 24,
    fontSize: 18,
    fontWeight: "300",
    textAlign: "right",
    marginVertical: 30,
    
    alignSelf: "flex-end",
    padding: 10,
    borderTopStartRadius: 0.001,
    borderBottomStartRadius: 0.001,
    borderRadius: 0.001,
    backgroundColor: "#9F37DE",
    borderColor: "#ffffff00",
  },

  pleadTheFifth: {
    fontSize: 24,
    fontWeight: "300",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 30,
  },

  pleadAlignLeft: {
    // transition: '.2s ease',

    position: 'absolute',
    left: 0,
    top: '0%',

    alignSelf: "flex-start",
    // position: "absolute",
    // bottom: "10%",
    padding: 10,
    borderTopEndRadius: 0.001,
    borderBottomEndRadius: 0.001,
    borderRadius: 0.001,
    backgroundColor: "#AD0D4B",
    borderColor: "#ffffff00",
  },

  pleadAlignRight: {
    // transition: '.2s ease',
    
    position: 'absolute',
    right: 0,
    bottom: '10%',

    alignSelf: "flex-end",
    // position: "absolute",
    // bottom: "10%",
    padding: 10,
    textAlign: "right",
    borderTopStartRadius: 0.001,
    borderBottomStartRadius: 0.001,
    borderRadius: 0.001,
    backgroundColor: "#9F37DE",
    borderColor: "#ffffff00",
  },

  question: {
    fontSize: 28,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 30,
  },

  questInAnsPhase: {
    paddingHorizontal: 16,
    paddingTop: 110,
    fontSize: 28,
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 30,
  },

  /**
   * ------IN-GAME (CHOSEN)------
   */
  pickedPlayerContainer: {
    position: 'relative',
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 0.01,
  },

  pickedPlayer: {
    width: "48%",
  },

  pickedPlayerCard: {
    height: 250,
    display: "flex",
    justifyContent: "center",
    // transition: '.4s ease'
  },

  cardPink: {
    backgroundColor: "#AD0D4B",
  },

  cardPinkAnswer: {
    backgroundColor: '#ad0d4b80'
  },

  cardPurpleAnswer: {
    backgroundColor: '#9f37de80'
  },

  cardPurple: {
    backgroundColor: "#9F37DE",
  },

  belowCardText: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },

  alignLeft: {
    color: "#AD0D4B",
  },

  alignRight: {
    color: "#9F37DE",
    textAlign: "right",
  },

  /**
   * ------IN-GAME (NOT CHOSEN)------
   */
  titleNotChosen: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "300",
    marginVertical: 30,
    color: "#D7D98B"
  },

  inputTitle: {
    marginVertical: 10,
  },

  inputContainer: {
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#161f26',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bottom: 0,
    left: 0,
    width: '100%'
  },

  questionInputContainer: {
    // flex: 1,
    // height:48,
    padding: 10,
    flexDirection: 'row',
    // backgroundColor: '#161F26',
    backgroundColor: '#ffffff00',

  },

  questionInput: {
    flex: 2,
    height: '100%',
    overflow: 'hidden',
    backgroundColor: '#7B0D37',
    borderColor: '#ffffff00',
  },

  questionInputButton: {
    // maxHeight: '100%',
    borderRadius: 50,
    marginHorizontal: 10,
    height: 50,
    width: 50
  },
});
