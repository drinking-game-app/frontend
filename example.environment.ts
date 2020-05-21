import Constants from "expo-constants";

/**
 * Your local IP Address
 */
const localhost = 'http://localhost:3000'
//'http://192.168.0.164:3000'

const ENV = {
 dev: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '',
    IOS_GOOGLE_CLIENT_ID: '',
    ANDROID_GOOGLE_CLIENT_ID: ''
 },
 staging: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '',
    IOS_GOOGLE_CLIENT_ID: '',
    ANDROID_GOOGLE_CLIENT_ID: ''
 },
 prod: {
    SERVER_URL: localhost,
    WEB_GOOGLE_CLIENT_ID: '',
    IOS_GOOGLE_CLIENT_ID: '',
    ANDROID_GOOGLE_CLIENT_ID: ''
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