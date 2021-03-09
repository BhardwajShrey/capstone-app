import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import UserDetails from "../../screens/UserDetails";

const Stack = createStackNavigator();

export default function Account()
{
    return(
        <Stack.Navigator initialRouteName = "UserDetails">
            <Stack.Screen name = "UserDetails" component = {UserDetails} options = {{title: "User Details" ,headerStyle: {backgroundColor: "#3f7cac"}, headerTintColor: "#fff"}} />
        </Stack.Navigator>
    );
}