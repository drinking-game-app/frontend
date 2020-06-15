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
    // maxHeight: 700,
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
    // paddingVertical: 8,
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
    // textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginVertical: 30,
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
});
