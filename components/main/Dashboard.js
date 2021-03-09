import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import Feed from "../../screens/Feed";
import AddComplaint from "../../screens/AddComplaint";

const Stack = createStackNavigator();

export default function Dashboard() {
    return (
        <Stack.Navigator initialRouteName = "Feed">
            <Stack.Screen name = "Feed" component = {Feed} options = {{headerStyle: {backgroundColor: "#3f7cac"}, headerTintColor: "#fff"}} />
        </Stack.Navigator>
    )
}
