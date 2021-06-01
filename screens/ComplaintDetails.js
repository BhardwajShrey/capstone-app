import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";
import Label from "../shared/Label";

export default function ReviewDetails({route})
{
    console.log(route.params.image);

    var complaintLabels = route.params.type.map(
        type =>
        {
            // console.log(type);

            return (<Label text = {type} />);
        }
    );

    return(
        <View style = {globalStyles.container}>
            <Card>
                <Text style = {globalStyles.titleText}>{route.params.title}</Text>
                <Text>{route.params.body}</Text>
                <Text>Location: {route.params.location}</Text>

                <View style = {styles.status}>
                    {complaintLabels}
                </View>

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