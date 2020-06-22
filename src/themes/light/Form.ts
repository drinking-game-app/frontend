import { StyleSheet } from "react-native";

/**
 * Form Stylesheet for the light theme
 */
export default StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#AD0D4B',
    position: 'relative',
    justifyContent: "center",
  },

  formContainerReg: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#D14688',
    position: 'relative',
    justifyContent: "center",
  },

  homeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  formControl: {
    marginVertical: 4,
    backgroundColor: '#7B0D37',
    borderColor: '#ffffff00',
    fontSize: 16
  },

  formControlReg: {
    marginVertical: 4,
    backgroundColor: '#AB2364',
    borderColor: '#ffffff00',
    fontSize: 16,
  },

  submitButton: {
    marginVertical: 24,
    paddingVertical: 20,
    backgroundColor: '#00B0FF',
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
  },

  noAccountButton: {
    // alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: '#D14688',
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
  },

  haveAccountButton: {
    // alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: 20,
    backgroundColor: '#AD0D4B',
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
  },

  thirdPartyButtonContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderWidth: 0,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 2},
    borderRadius: 5,
  },

  formButton:{
    marginVertical: 12
  },

  customHrTag: {
    borderWidth: 0.5,
    borderColor: '#D14688',
    marginTop: 25,
    marginBottom: 50,
  },

  customHrTagReg: {
    borderWidth: 0.5,
    borderColor: '#AD0D4B',
    marginTop: 25,
    marginBottom: 35,
  }
});
