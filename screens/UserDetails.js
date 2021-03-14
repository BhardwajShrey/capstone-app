import React from 'react';
import {StyleSheet, View, Text} from "react-native";

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

export default function UserDetails() {
    return (
        <View style = {globalStyles.container}>
            <Card>
                <Text style = {globalStyles.titleText}>Separate cards for: </Text>
                <View style = {styles.status}>
                    <Text>1. Account details menu</Text>
                </View>
                <View style = {styles.status}>
                    <Text>2. Past complaints page</Text>
                </View>
                <View style = {styles.status}>
                    <Text>3. Help & FAQ section</Text>
                </View>
                <View style = {styles.status}>
                    <Text>4. Logout</Text>
                </View>
            </Card>
        </View>
    )
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
        }
    }
);