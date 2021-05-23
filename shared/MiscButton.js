import React from "react";
import {StyleSheet, TouchableOpacity, Text, View} from "react-native";

export default function MiscButton({text, onPress})
{
    return(
        <TouchableOpacity onPress = {onPress}>
            <View style = {styles.button}>
                <Text style = {styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        button: {
            borderRadius: 8,
            paddingVertical: 16,
            paddingHorizontal: 10,
            marginVertical: 15,
            marginHorizontal: 120,
            backgroundColor: "#704e2e"
        },
        buttonText: {
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 16,
            textAlign: "center"
        }
    }
);