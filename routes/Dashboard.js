import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";

import Feed from "../screens/Feed";
import ComplaintDetails from "../screens/ComplaintDetails";

const Stack = createStackNavigator();

export default function Dashboard() {
    return (
        <Stack.Navigator initialRouteName = "Feed" screenOptions = {{headerStyle: {backgroundColor: "#2e86ab"}, headerTintColor: "#fff"}}>
            <Stack.Screen name = "Feed" component = {Feed} options = {{title: "Open Complaints"}} />
            <Stack.Screen name = "ComplaintDetails" component = {ComplaintDetails} options = {{title: "Complaint Details"}} />
        </Stack.Navigator>
    )
}
