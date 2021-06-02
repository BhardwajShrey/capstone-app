import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import CovidScreen from "../screens/CovidScreen";
import CovidCasesDetails from "../screens/CovidCasesDetails";
import VaccinationDetails from "../screens/VaccinationDetails";

const Stack = createStackNavigator();

export default function Covid()
{
    return(
        <Stack.Navigator initialRouteName = "CovidScreen" screenOptions = {{headerStyle: {backgroundColor: "#2e86ab"}, headerTintColor: "#fff"}}>
            <Stack.Screen name = "CovidScreen" component = {CovidScreen} options = {{title: "Covid Help"}} />
            <Stack.Screen name = "CovidCasesDetails" component = {CovidCasesDetails} options = {{title: "Covid Cases Details"}} />
            <Stack.Screen name = "VaccinationDetails" component = {VaccinationDetails} options = {{title: "Vaccination Details"}} />
        </Stack.Navigator>
    );
}