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

  state = {
    track: null,
    isPlaying: false
  };

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
    this.setState({isPlaying: false});

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

          const currentTrack = {
            url: `file:///${url}`,
            duration: duration
          };

          this.setState({track: currentTrack});
          this.setState({isPlaying: true});
        });
    }
  };

  handlePlayRecording = () => {
    if (this.audioPlayerPlotRef) {
      this.audioPlayerPlotRef.renderByFile(this.state.track.url);
      this.forceUpdate();
    }
  };

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    const plotHeight = 200;
    let pixelsPerSecond = null;
    let plotWidth = null;

    if (this.state.track != null) {
      pixelsPerSecond = windowWidth / 6;
      plotWidth = (parseInt(this.state.track) / 1000) * pixelsPerSecond + windowWidth;
    }

    console.log(this.state.isPlaying);

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={this.setScrollViewRef}
        >
          {!!this.state.isPlaying && (
            <AudioPlayerPlot
              width={plotWidth}
              height={plotHeight}
              pixelsPerSecond={pixelsPerSecond}
              ref={this.setAudioPlayerPlotRef}
            />
          )}
        </ScrollView>

        <AudioRecorder
          width={windowWidth}
          height={plotHeight}
          ref={this.setAudioRecorderRef}
        />

        <Button title="Start Recording" onPress={this.handleStartRecording} />
        <Button title="Stop Recording" onPress={this.handleStopRecording} />
        <Button title="Play Recording" onPress={this.handlePlayRecording} />
      </View>
    );
  }
}
