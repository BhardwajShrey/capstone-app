import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

export default function ReviewDetails({navigation, route})
{
    return(
        <View style = {globalStyles.container}>
            <Card>
                <Text style = {globalStyles.titleText}>{route.params.Title}</Text>
                <Text>{route.params.Body}</Text>
                <Text>Location: {route.params.Location}</Text>
                <View style = {styles.status}>
                    <Text>Status: {route.params.Status}</Text>
                </View>
            </Card>
        </View>
    );
}

// Rating = Review mein ek field
// rating = stylesheet and computation purposes ke liye

const styles = StyleSheet.create(
    {
        status: {
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 16,
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#eef"
        }
    }
);