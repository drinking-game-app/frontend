import { StyleSheet } from "react-native";

/**
 * Form Stylesheet for the light theme
 */
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  formButton: {
    width: 150,
    height: 35,
    backgroundColor: "#add8e6",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
});
