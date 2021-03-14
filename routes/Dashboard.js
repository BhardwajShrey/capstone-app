import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import Feed from "../screens/Feed";

const Stack = createStackNavigator();

export default function Dashboard() {
    return (
        <Stack.Navigator initialRouteName = "Feed" screenOptions = {{headerStyle: {backgroundColor: "#3f7cac"}, headerTintColor: "#fff"}}>
            <Stack.Screen name = "Feed" component = {Feed} />
        </Stack.Navigator>
    )
}
