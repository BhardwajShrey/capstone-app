import React, { useState, useEffect } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Platform, StyleSheet, Text, View, Dimensions} from "react-native";
import * as Location from 'expo-location';

export default function AddLocation() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null); 
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }   
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
    }, []); 

    let coordinates = 'Waiting...';
    var mapData = (
        <View style={styles.container}>
            <MapView style={styles.map} />
        </View>
    );

    if (errorMsg) {
        coordinates = errorMsg;
    } else if (location) {
        let temp = JSON.stringify(location);
        coordinates = JSON.parse(temp);
        mapData = (
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion = {
                    {
                        latitude: coordinates.coords.latitude,
                        longitude: coordinates.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                } 
            />
        );
    }

    return (
        <View style={styles.container}>
            {mapData}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});