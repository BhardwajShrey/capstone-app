import React, { Component } from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux/actions/Index";

import Dashboard from "../routes/Dashboard";
import Account from "../routes/Account";
import AddComplaint from "../routes/AddComplaint";

const Tab = createMaterialBottomTabNavigator();

class Main extends Component
{
    componentDidMount()
    {
        this.props.fetchUser();
    }

    render()
    {
        return(
            <Tab.Navigator initialRouteName = "Dashboard" shifting = {true}  activeColor = "#0496ff" inactiveColor = "#c9c9c9" barStyle = {{ backgroundColor: '#fffbfc' }}>
                <Tab.Screen
                    name = "Dashboard"
                    component = {Dashboard}
                    options = {
                        {
                            tabBarIcon: ({color, size}) =>
                            (
                                <MaterialIcons name = "home" color = {color} size = {26} />
                            )
                        }
                    }
                />

                <Tab.Screen
                    name = "AddComplaint"
                    component = {AddComplaint}
                    options = {
                        {
                            title: "New Complaint",
                            tabBarIcon: ({color, size}) =>
                            (
                                <MaterialIcons name = "add-box" color = {color} size = {26} />
                            )
                        }
                    }
                />
                
                <Tab.Screen
                    name = "Account"
                    component = {Account}
                    options = {
                        {
                            tabBarIcon: ({color, size}) =>
                            (
                                <MaterialIcons name = "account-circle" color = {color} size = {26} />
                            )
                        }
                    }
                />

            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (store) => (
    {
        currentUser: store.userState.currentUser
    }
);

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
