import React from 'react';
import {View, Text} from "react-native";

import {globalStyles} from "../styles/Global";

export default function UserDetails() {
    return (
        <View style = {globalStyles.container}>
            <Text>This is the accounts menu. This will contain: </Text>
            <Text>1. Account details menu</Text>
            <Text>2. Past complaints page</Text>
            <Text>3. Help & FAQ section</Text>
            <Text>4. Logout</Text>
        </View>
    )
}