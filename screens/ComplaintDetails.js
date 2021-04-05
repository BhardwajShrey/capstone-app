import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

export default function ReviewDetails({route})
{
    console.log(route.params.image);

    var imageRenderer = null;

    if(route.params.image)
    {
        console.log("image should load...");
        imageRenderer = (
            <Image
                style = {styles.image}
                source={{uri: "https://reactjs.org/logo-og.png"}}
                onLoadStart = {() => console.log("Burp")}
            />
        );
    }

    return(
        <View style = {globalStyles.container}>
            <Card>
                <Text style = {globalStyles.titleText}>{route.params.title}</Text>
                <Text>{route.params.body}</Text>
                <Text>Location: {route.params.location}</Text>

                <View style = {styles.status}>
                    <Text>Categories: {route.params.type[0]}, {route.params.type[1]}, {route.params.type[2]}</Text>
                </View>

                {imageRenderer}

                <View style = {styles.status}>
                    <Text>Status: {route.params.status}</Text>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        status: {
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 16,
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#eef"
        },
        image: {
            flex: 1,
            width: 400,
            height: 400,
            aspectRatio: 1 / 1
        }
    }
);