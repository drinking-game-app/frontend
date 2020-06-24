import { StyleSheet } from "react-native";

/**
 * App Stylesheet for the light theme
 */
export default StyleSheet.create({
  /**
   * ------LOBBY & IN GAME NOTIFICATION BAR------ 
   */
  container: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: "20%",
  },

  notification: {
    borderTopStartRadius: 0.001,
    borderBottomStartRadius: 0.001,
    borderRadius: 0.001,
    marginVertical: 8,
    borderColor: "#ffffff00",
  },
});
