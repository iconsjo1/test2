import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import {colors, routesNames, firstTimeStart} from '../../../services';
import VideoPlayer from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreenIOS = ({navigation}) => {
  const videoPlayer = useRef();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    AppState.addEventListener('change', (e) => {
      if (e === 'active') {
        setPaused(true);
        setPaused(false);
      }
    });

    return () => AppState.removeEventListener('change');
  }, []);

  const onPlaybackEnded = async () => {
    if (await AsyncStorage.getItem(firstTimeStart))
      navigation.replace(routesNames.main);
    else navigation.replace(routesNames.landing);
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        onError={onPlaybackEnded}
        ref={(ref) => (videoPlayer.current = ref)}
        paused={paused}
        source={require('../../../assets/intro.mp4')}
        resizeMode="cover"
        controls={false}
        onEnd={onPlaybackEnded}
        style={styles.container}
      />
    </View>
  );
};

export default SplashScreenIOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
