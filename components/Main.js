import React, { Component } from "react";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser, fetchUserPosts} from "../redux/actions/Index";

import Dashboard from "../routes/Dashboard";
import Account from "../routes/Account";
import AddComplaint from "../routes/AddComplaint";
import Covid from "../routes/Covid";

const Tab = createMaterialBottomTabNavigator();

class Main extends Component
{
    componentDidMount()
    {
        this.props.fetchUser();
        this.props.fetchUserPosts();
    }

    render()
    {
        return(
            <Tab.Navigator initialRouteName = "Dashboard" shifting = {true}  activeColor = "#2667ff" inactiveColor = "#c9c9c9" barStyle = {{ backgroundColor: '#fffcf9' }}>
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
                    name = "Covid"
                    component = {Covid}
                    options = {
                        {
                            title: "Covid Help",
                            tabBarIcon: ({color, size}) =>
                            (
                                <MaterialIcons name = "masks" color = {color} size = {26} />
                            )
                        }
                    }
                />
                
                {/* <Tab.Screen
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
                /> */}

            </Tab.Navigator>
        );
    }
}

const mapStateToProps = (store) => (
    {
        currentUser: store.userState.currentUser
    }
);

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
