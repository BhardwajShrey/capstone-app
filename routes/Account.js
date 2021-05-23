import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import UserDetails from "../screens/UserDetails";

const Stack = createStackNavigator();

export default function Account()
{
    return(
        <Stack.Navigator initialRouteName = "UserDetails" screenOptions = {{headerStyle: {backgroundColor: "#8bb174"}, headerTintColor: "#fff"}}>
            <Stack.Screen name = "UserDetails" component = {UserDetails} options = {{title: "User Details"}} />
        </Stack.Navigator>
    );
}