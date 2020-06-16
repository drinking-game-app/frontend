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
    paddingTop: 32,
    // paddingVertical: 16,
    // paddingHorizontal: 16,
    backgroundColor: "#161F26",
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
  },

  listItem: {
    paddingVertical: 20,
    fontSize: 30,
    backgroundColor: "#161F26",
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

  pleadTheFifth: {
    fontSize: 32,
    fontWeight: "400",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 30,
  },

  pleadAlignLeft: {
    alignSelf: "flex-start",
    // position: "absolute",
    // bottom: "10%",
    borderTopEndRadius: 0.001,
    borderBottomEndRadius: 0.001,
    borderRadius: 0.001,
    backgroundColor: "#AD0D4B",
    borderColor: "#ffffff00",
  },

  pleadAlignRight: {
    alignSelf: "flex-end",
    // position: "absolute",
    // bottom: "10%",
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

  /**
   * ------IN-GAME (CHOSEN)------
   */
  pickedPlayerContainer: {
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
  },

  cardPink: {
    backgroundColor: "#AD0D4B",
  },

  cardPurple: {
    backgroundColor: "#9F37DE",
  },

  belowCardText: {
    marginVertical: 10,
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
    fontWeight: 300,
    marginVertical: 30,
    color: "#D7D98B"
  },

  inputTitle: {
    marginVertical: 10,
  },

  inputContainer: {
    padding: 10,
    // alignSelf: 'stretch',
    textAlign: 'center',
    // backgroundColor: '#161F26',
    backgroundColor: '##ffffff00',
  },

  questionInputContainer: {
    // flex: 1,
    // height:48,
    padding: 10,
    flexDirection: 'row',
    // width: '100%',
    // backgroundColor: '#161F26',
    backgroundColor: '##ffffff00',
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
