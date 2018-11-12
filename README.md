# react-native-audio-recorder-example-project

A minimal working example project for [React-Native-Native-Audio-Recorder](https://github.com/audvice/react-native-audio-recorder).

## Getting started

#### General

1. Clone the project via the following command:  
`$ git clone git@github.com:audvice/react-native-audio-recorder-example-project.git`

2. Change into the cloned directory:  
`$ cd react-native-audio-recorder-example-project/`

3. Install NPM packages:  
`$ npm install`

4. Ensure that all packages are correctly linked by running:
`react-native link`

#### iOS

1. Open the project inside the ios folder in xCode:  
`RNNativeAudioRecorderExample.xcodeproj`

2. Go to Project -> General and check if the correct signing profile is set.

3. Build the project by pressing the Build button

#### Android

1. Open android folder with IntelliJ/AndroidStudio/etc.  

2. Gradle should automatically start to build the dependencies, if not start it manually.

3. Build the project by running the following command in the root folder of the project:  
`react-native run-android`