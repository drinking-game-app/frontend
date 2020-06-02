import { StyleSheet } from "react-native";

/**
 * Form Stylesheet for the light theme
 */
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  thirdPartyButtonContainer: {
    alignItems: "center",
  }
});
