
/**
 * Import app.json and expand with extra variables
 */

// SERVER_URL: "https://drinking-app.herokuapp.com",
// SERVER_URL: "http://192.168.0.164:3000",
// SERVER_URL: "http://localhost:3000",
// SERVER_URL: "http://149.56.2.204:3000"

export default ({ config }) => {
  return {
    ...config,
    extra: {    
      SERVER_URL: "http://192.168.5.206:3000",
      WEB_GOOGLE_CLIENT_ID: "588944987607-75ms4ckcflcnne79cac6gdb85hqlovm4.apps.googleusercontent.com",
      DEV_IOS_GOOGLE_CLIENT_ID: "588944987607-afp8alav7caepo0auaua06lhtbip9s15.apps.googleusercontent.com",
      PROD_IOS_GOOGLE_CLIENT_ID: "588944987607-7sg3jt6grf38dog7ohplceg6f56vq44b.apps.googleusercontent.com",
      DEV_ANDROID_GOOGLE_CLIENT_ID: "588944987607-klvj304qhfhd7g7ah8d19tl125muj183.apps.googleusercontent.com",
    },
  };
};
