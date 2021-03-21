import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import {MaterialIcons} from "@expo/vector-icons";

export default function AddImage({navigation}) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () =>
  {
    if(camera)
    {
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
    }
  }

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera/gallery...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera ref = {ref => setCamera(ref)} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.flipButton}
                onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}>
                <MaterialIcons
                    name = "repeat"
                    size = {35}
                    color = "#fff"
                />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.clickButton} onPress = {() => takePicture()}>
              <MaterialIcons
                  name = "camera"
                  size = {90}
                  color = "#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.clickButton} onPress = {() => pickImage()}>
              <MaterialIcons
                  name = "image"
                  size = {35}
                  color = "#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.clickButton} onPress = {() => navigation.navigate("ComplaintForm", {image})}>
              <MaterialIcons
                  name = "save"
                  size = {35}
                  color = "#fff"
              />
            </TouchableOpacity>
        </View>
        {image && <Image source = {{uri: image}} style = {{flex: 1}} />}
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  flipButton: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  clickButton: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: 'center',
    color:"white"
  }
});
