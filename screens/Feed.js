import React from 'react';
import {View, Text} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";

import {globalStyles} from "../styles/Global";

export default function Feed() {
    return (
        <View style = {globalStyles.container}>
            <Text>User feed will contain:</Text>
            <Text>1. All open complaints</Text>
            <Text>2. Modal which links to page to open a new complaint</Text>
        </View>
    )
}