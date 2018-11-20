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
            value: { fileUrl: url, fileDurationInMs: duration }
          } = params;

          const currentTrack = {
            url: `file:///${url}`,
            duration: duration
          };

          this.setState({track: currentTrack});
        })
        .then(params => {
          // TODO: This line makes leads to app crash because it executes the rendering of the file waveform
          // TODO: However the file is not ready at this point of time
          this.audioPlayerPlotRef.renderByFile(this.state.track.url);
          this.forceUpdate();
        });
    }
  };

  handlePlayRecording = () => {
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
    }

    return (
      <View style={styles.container}>
        <DummyWaveLine width={windowWidth} height={plotHeight} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={this.setScrollViewRef}
        >
          {!!this.state.track && (
            <AudioPlayerPlot
              width={plotWidth}
              height={plotHeight}
              pixelsPerSecond={pixelsPerSecond}
              ref={this.setAudioPlayerPlotRef}
            />
          )}

          {this.state.isPlaying && (
            <Video
              audioOnly
              paused={!this.state.isPlaying}
              source={{ uri: this.state.track.url }}
              ref={this.setPlayerRef}
              onLoad={this.handleTrackLoad}
              onEnd={this.handlePlaybackEnd}
            />
          )}
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
