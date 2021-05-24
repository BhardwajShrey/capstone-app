import React, { useState, useEffect } from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import {Platform, StyleSheet, Text, View, Dimensions} from "react-native";

import FlatButton from "../shared/FlatButton";

export default function AddLocation({navigation, route}) {
    const [coordinates, setCoordinates] = useState([]);

    useEffect(
        () =>
        {
          setCoordinates(route.params?.coordinates);
          console.log(route.params?.coordinates);
        }, []
      );

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                initialRegion = {
                    {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }
                } 
            >
                <Marker draggable
                    coordinate = {
                        {
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude
                        }
                    }
                    onDragEnd={
                        (e) => 
                        {
                            setCoordinates(e.nativeEvent.coordinate);
                        }
                    }
                >
                    <Callout tooltip>
                        <View>
                            <FlatButton text = "Mark Location" onPress = {() => navigation.navigate("ComplaintForm", {coordinates})} />
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            {/* <FlatButton text = "Mark Location" onPress = {() => navigation.navigate("ComplaintForm", {coordinates})} /> */}
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