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

import DummyWaveLine from './DummyWaveLine';

import Video from 'react-native-video';

import { AudioRecorder, AudioPlayerPlot } from 'react-native-native-audio-recorder';


type Props = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class App extends React.Component<Props> {
  audioRecorderRef: ?ElementRef<AudioRecorder> = null;

  audioPlayerPlotRef: ?ElementRef<AudioPlayerPlot> = null;

  scrollViewRef: ?ElementRef<ScrollView> = null;

  playerRef: ?ElementRef<Video> = null;

  state = {
    track: null,
    isRecording: false,
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

  setPlayerRef = (playerRef: ?ElementRef<Video>) => {
    this.playerRef = playerRef;
  };

  handleTrackLoad = () => {
    this.setState({isPlaying: true});

    this.playerRef.seek(0);
  };

  handlePlaybackEnd = () => {
    this.setState({isPlaying: false});

    this.playerRef.seek(0);

    this.forceUpdate();
  };


  handleStartRecording = () => {
    if (this.audioRecorderRef) {
      this.setState({isRecording: true});
      this.audioRecorderRef.startRecording();
    }
  };

  handleStopRecording = () => {
    if (this.audioRecorderRef) {
      this.setState({isRecording: false});
      this.audioRecorderRef.stopRecording()
        .then(params => {
          const {
            value: { fileName: name, fileDurationInMs: duration }
          } = params;

          const currentTrack = {
            fileName: name + `?timestamp=123456`,
            duration: duration
          };

          this.setState({track: currentTrack});
        })
    }
  };

  handlePlayRecording = () => {
    this.audioPlayerPlotRef.renderByFile(this.state.track.fileName);
    this.forceUpdate();

    const playing = !this.state.isPlaying;

    this.setState({isPlaying: playing});

    this.forceUpdate();
  };

  render() {
    const { width: windowWidth } = Dimensions.get('window');

    const plotHeight = 200;
    let pixelsPerSecond = null;
    let plotWidth = null;

    if (this.state.track != null) {
      pixelsPerSecond = windowWidth / 6;
      plotWidth = (parseInt(this.state.track.duration) / 1000) * pixelsPerSecond + windowWidth;
    } else {
      pixelsPerSecond = windowWidth / 6;
      plotWidth = windowWidth;
    }

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator
          ref={this.setScrollViewRef}
        >
          <AudioPlayerPlot
            width={plotWidth}
            height={plotHeight}
            pixelsPerSecond={pixelsPerSecond}
            ref={this.setAudioPlayerPlotRef}
          />
        </ScrollView>

        <AudioRecorder
          width={windowWidth}
          height={plotHeight}
          ref={this.setAudioRecorderRef}
        />

        <Button title="Start Recording" onPress={this.handleStartRecording} disabled={this.state.isRecording} />
        <Button title="Stop Recording" onPress={this.handleStopRecording} disabled={!this.state.isRecording} />
        <Button title="Play Recording" onPress={this.handlePlayRecording} disabled={this.state.isRecording || !this.state.track}/>
      </View>
    );
  }
}
