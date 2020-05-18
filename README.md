# React Native Expo Frontend for Drinking Game Application

### Description
The React Native frontend, which will be the face of the drinking game application. Written in React Native TypeScript, and compiled using Expo.

### Demo
A live preview of this application can be accessed <a href="https://expo.io/@eoan/drinking-game-frontend">here</a>

### What you need to run this code
1. Node >= 12.14.1
2. NPM >= 6.14.4
3. Expo >= 3.20.3

### How to run this code
1. If you haven't already, install expo using `npm install -g expo-cli`
2. Clone this repository, and `cd` into it
3. Run `npm install` to install the node dependencies
4. Run `cp example.environment.ts environment.ts` and fill in your environment variables.
5. Run `npm run start` to start the development server
6. A browser window should pop up with the expo dev tools

### Installing React Native Debugger
* A specific version of the React Native Debugger is needed to be compatible with the version of React Native that Expo uses. 
* To download this version, run `npm run download-debug:windows`, and install it on your computer. 
* If that command doesn't work, you can install it <a href="https://github.com/jhen0409/react-native-debugger/releases/download/v0.11.3/rn-debugger-macos-x64.zip" target="_blank">here</a>.
* Once installed, run `npm run debug` to start the debugger. (The debugger only works on an iOS simulator / Android emulator, and you must have Remote Debugging Enabled).
* The React Dev Tools Chrome Extension can be used to debug while running on the web.


#### What you can run this code on
This application can be compiled and launched on the following platforms
1. <a href="#running-on-the-web">Web</a>
2. <a href="#running-on-an-android-emulator">Android Emulator</a>
3. <a href="running-on-an-android-physical-device">Android Physical Device</a>
4. <a href="#running-on-an-ios-simulator-mac-osx-only">iPhone Simulator</a>
5. <a href="#running-on-an-ios-physical-device">iPhone Physical Device</a>
<br/> Instructions for each device are given below

#### Running on the web
1. After starting the development server, select `Run in web browser` or without starting the development server, run `npm run web`

#### Running on an iOS simulator (Mac OSX only)
1. Make sure you have Xcode installed and up to date
2. If you haven't already, install the Xcode Command Line tools by running `xcode-select --install` (This may take a while)
2. After starting the development server, select `Run on iOS simulator` or without starting the development server, run `npm run ios`

#### Running on an Android Emulator
1. Make sure you have Android Studio, and an android emulator installed
2. Make sure you have followed the <a href="https://reactnative.dev/docs/environment-setup">React Native CLI Quickstart (Not Expo CLI Quickstart)</a> under *Android* Target OS
3. After starting the development server, select `Run on Android device/emulator` or without starting the development server, run `npm run android`

#### Running on an iOS physical device
You can run this code on your own iOS device while running the development server, and preview live updates as you change the code.

###### Requirements
* iOS >= 10.0
* At least 80MBs of available storage

###### Running on your device
1. Download the <a href="https://itunes.com/apps/exponent">Expo client from the iOS App Store</a>
2. After starting the development server, scan the QR code with your device, and Expo will generate a live preview of your app

#### Running on an Android physical device
You can run this code on your own Android device while running the development server, and preview live updates as you change the code.

###### Requirements
* Android >= 5 - Lollipop
* At least 80MBs of available storage

###### Running on your device
1. Download the <a href="https://play.google.com/store/apps/details?id=host.exp.exponent">Expo client from the Play Store</a>
2. After starting the development server, scan the QR code with your device, and Expo will generate a live preview of your app