import { StyleSheet } from "react-native";

/**
 * Form Stylesheet for the light theme
 */
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  },
  formButton:{
    marginVertical: 12
  },
  questionInputContainer: {
    // flex: 1,
    // height:48,
    flexDirection: 'row',
    // width: '100%',
  },
  questionInput: {
    flex: 2,
    height: '100%',
    overflow: 'hidden'
  },
  questionInputButton: {
    // maxHeight: '100%',
    borderRadius: 50,
    marginHorizontal: 10,
    height: 50,
    width: 50
  }
});
