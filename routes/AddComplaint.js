import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import ComplaintForm from "../screens/ComplaintForm";
import AddImage from "../screens/AddImage";
import Save from "../screens/Save";

const Stack = createStackNavigator();

export default function AddComplaint()
{
    return(
        <Stack.Navigator initialRouteName = "ComplaintForm" screenOptions = {{headerStyle: {backgroundColor: "#3f7cac"}, headerTintColor: "#fff"}}>
            <Stack.Screen name = "ComplaintForm" component = {ComplaintForm} options = {{title: "New Complaint"}} />
            <Stack.Screen name = "AddImage" component = {AddImage} options = {{title: "Camera", headerShown: false}} />
            <Stack.Screen name = "Save" component = {Save} options = {{title: "Upload Complaint"}} />
        </Stack.Navigator>
    );
}