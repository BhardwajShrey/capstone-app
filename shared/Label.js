import React from "react";
import {StyleSheet, Text, View} from "react-native";

export default function Label({text})
{
    return(
        <View style = {styles.label}>
            <Text style = {styles.labelText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        label: {
            borderRadius: 14,
            paddingVertical: 7,
            paddingHorizontal: 5,
            marginVertical: 10,
            marginHorizontal: 5,
            backgroundColor: "#9474b8"
        },
        labelText: {
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 10,
            textAlign: "center"
        }
    }
);