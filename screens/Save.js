import React from 'react';
import {View, Text, Image} from "react-native";

export default function Save({route}) {
    console.log("Delimiter");
    return (
        <View>
            <Text>{route.params.image}</Text>
        </View>
    )
}
