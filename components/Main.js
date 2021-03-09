import React, { Component } from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchUser} from "../redux/actions/Index";

import Dashboard from "./main/Dashboard";
import Account from "./main/Account";

const Tab = createBottomTabNavigator();

class Main extends Component
{
    componentDidMount()
    {
        this.props.fetchUser();
    }

    render()
    {
        return(
            <Tab.Navigator>
                <Tab.Screen
                    name = "Dashboard"
                    component = {Dashboard}
                    options = {
                        {
                            tabBarIcon: ({color, size}) =>
                            (
                                <MaterialIcons name = "home" color = {color} size = {25} />
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
                                <MaterialIcons name = "account-circle" color = {color} size = {25} />
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
