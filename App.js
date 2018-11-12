/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import type { ElementRef } from 'react';
import {Button, Dimensions, StyleSheet, View, ScrollView} from 'react-native';

import { AudioRecorder, AudioPlayerPlot } from 'react-native-native-audio-recorder';


type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scruber: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2,
    backgroundColor: 'black',
    width: 5,
    height: '100%'
  }
});

export default class App extends React.Component<Props> {
  audioRecorderRef: ?ElementRef<AudioRecorder> = null;

  audioPlayerPlotRef: ?ElementRef<AudioPlayerPlot> = null;

  scrollViewRef: ?ElementRef<ScrollView> = null;

/*  state = {
    isSetup: false,
    isRecording: false,
    fileUrl: ''
  };*/

  componentDidMount = () => {
    if (this.audioRecorderRef) {
      this.audioRecorderRef.setupRecorder();
    }
  };

  setAudioRecorderRef = (ref: ElementRef<AudioRecorder>) => {
    this.audioRecorderRef = ref;
  };

  setAudioPlayerPlotRef = (ref: ElementRef<AudioPlayerPlot>) => {
    this.audioPlayerPlotRef = ref;
  };

  setScrollViewRef = (ref: ElementRef<any>) => {
    this.scrollViewRef = ref;
  };

  handleStartRecording = () => {
    if (this.audioRecorderRef) {
      this.audioRecorderRef.startRecording();
    }
  };

  handleStopRecording = () => {
    if (this.audioRecorderRef) {
      this.audioRecorderRef.stopRecording()
        .then(params => {
          const {
            value: { fileUrl: url, fileDurationInMs: duration }
          } = params;

          console.log(params)

          const currentTrack = {
            id: url,
            url: `file:///${url}`,
            duration: duration,
            title: 'Recording',
            artist: 'me'
          };
        });
    }
  };

  handlePlayRecording = () => {
    this.audioPlayerPlotRef.renderByFile();
    this.forceUpdate();
  };

  render() {
    const { windowWidth } = Dimensions.get('window');
    const recorderHeight = 200;
/*    const pixelsPerSecond = windowWidth / 6;
    const plotWidth = (trackDuration / 1000) * PIXELS_PER_SECOND + windowWidth;*/

    return (
      <View style={styles.container}>
{/*        <DummyWaveLine width={windowWidth} height={plotHeight} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={this.setScrollViewRef}
        >
          {!!trackUrl && (
            <AudioPlayerPlot
              width={plotWidth}
              height={plotHeight}
              pixelsPerSecond={pixelsPerSecond}
              ref={this.setAudioPlayerPlotRef}
            />
          )}
        </ScrollView>*/}

        <AudioRecorder
          width={windowWidth}
          height={recorderHeight}
          ref={this.setAudioRecorderRef}
        />

        <Button title="Start Recording" onPress={this.handleStartRecording} />
        <Button title="Stop Recording" onPress={this.handleStopRecording} />
        <Button title="Play Recording" onPress={this.handlePlayRecording} />
      </View>
    );
  }
}
