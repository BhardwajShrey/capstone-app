import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityBase } from 'react-native';
import { Camera } from 'expo-camera';
import {MaterialIcons} from "@expo/vector-icons";

export default function AddImage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () =>
  {
    if(camera)
    {
        const data = await camera.takePictureAsync(null);
        console.log(data.uri);
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
                    style = {styles.buttonIcon}
                />
            </TouchableOpacity>
            <MaterialIcons
                name = "camera"
                size = {69}
                style = {styles.clickButton}
                onPress = {() => takePicture()}
            />
        </View>
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
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  clickButton: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: 'center',
    color:"white"
  },
  buttonIcon: {
    color: 'white',
  },
});
