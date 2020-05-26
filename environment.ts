import Constants from "expo-constants";

/**
 * Your local IP Address
 */
const localhost = 
//'http://localhost:3000'
'http://192.168.0.164:3000'

interface IEnvVars {
  SERVER_URL: string;
  WEB_GOOGLE_CLIENT_ID: string;
  IOS_GOOGLE_CLIENT_ID: string;
  ANDROID_GOOGLE_CLIENT_ID: string;
}

interface IENV {
  dev: IEnvVars;
  staging: IEnvVars;
  prod: IEnvVars
}

const ENV: IENV = {
 dev: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '588944987607-75ms4ckcflcnne79cac6gdb85hqlovm4.apps.googleusercontent.com',
    IOS_GOOGLE_CLIENT_ID: '588944987607-afp8alav7caepo0auaua06lhtbip9s15.apps.googleusercontent.com',
    ANDROID_GOOGLE_CLIENT_ID: '588944987607-klvj304qhfhd7g7ah8d19tl125muj183.apps.googleusercontent.com'
 },
 staging: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '588944987607-75ms4ckcflcnne79cac6gdb85hqlovm4.apps.googleusercontent.com',
    IOS_GOOGLE_CLIENT_ID: '588944987607-afp8alav7caepo0auaua06lhtbip9s15.apps.googleusercontent.com',
    ANDROID_GOOGLE_CLIENT_ID: '588944987607-klvj304qhfhd7g7ah8d19tl125muj183.apps.googleusercontent.com'
 },
 prod: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '588944987607-75ms4ckcflcnne79cac6gdb85hqlovm4.apps.googleusercontent.com',
    IOS_GOOGLE_CLIENT_ID: '588944987607-afp8alav7caepo0auaua06lhtbip9s15.apps.googleusercontent.com',
    ANDROID_GOOGLE_CLIENT_ID: '588944987607-klvj304qhfhd7g7ah8d19tl125muj183.apps.googleusercontent.com'
 }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
 // What is __DEV__ ?
 // This variable is set to true when react-native is running in Dev mode.
 // __DEV__ is true when run locally, but false when published.
 if (__DEV__) {
   return ENV.dev;
 } else if (env === 'staging') {
   return ENV.staging;
 } else if (env === 'prod') {
   return ENV.prod;
 }
};

export default getEnvVars;