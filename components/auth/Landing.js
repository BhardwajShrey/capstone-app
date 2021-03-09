import React from 'react';
import {View, StyleSheet, Button} from "react-native";

import FlatButton from "../../shared/FlatButton";

export default function Landing({navigation}) {
    return (
        <View style = {styles.landing}>
            {/* <Button
                title = "register"
                onPress = {() => navigation.navigate("Register")}
            /> */}
            <FlatButton text = "Register" onPress = {() => navigation.navigate("Register")} />

            {/* <Button
                title = "login"
                onPress = {() => navigation.navigate("Login")}
            /> */}
            <FlatButton text = "Login" onPress = {() => navigation.navigate("Login")} />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        landing: {
            flex: 1,
            justifyContent: "center"
        },
    }
);