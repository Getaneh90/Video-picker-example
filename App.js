import { useState } from 'react';
import { Button, View, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function VideoPickerScreen() {
  const [mediaUri, setMediaUri] = useState(null);
  const [isVideo, setIsVideo] = useState(false);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled && result.assets[0].uri) {
      setMediaUri(result.assets[0].uri);
      setIsVideo(result.assets[0].type === 'video');
    }
  };

  const player =  useVideoPlayer(mediaUri, player => {
    player.loop = true;
    player.play();
  });


  return (
    <View style={styles.container}>
      <Button title="Pick a media from camera roll" onPress={pickMedia} />

      {mediaUri && isVideo && player && (
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>
      )}

      {mediaUri && !isVideo && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: mediaUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  videoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  video: {
    width: 350,
    height: 275,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 275,
    resizeMode: 'contain',
  },
});
