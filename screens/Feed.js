import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

function Feed(props)
{
    const {currentUser, posts} = props;

    // console.log(currentUser, posts);

    return (
        <View style = {globalStyles.container}>
            <FlatList
                data = {posts}
                renderItem = {
                    ({item}) =>
                    (
                        <TouchableOpacity 
                            onPress = {
                                () => props.navigation.navigate("ComplaintDetails", {
                                    title: item.title,
                                    body: item.body,
                                    location: item.location,
                                    type: item.type,
                                    status: item.status,
                                    image: item.image
                                })
                            }
                        >
                            <Card>
                                <Text style = {globalStyles.titleText}>{item.title}</Text>
                                <Text>{item.location}</Text>
                                <View style = {styles.status}>
                                    <Text>Status: {item.status}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    )
                }
            />  
        </View>
    )
}

const mapStateToProps = (store) => (
    {
        currentUser: store.userState.currentUser,
        posts: store.userState.posts
    }
);

export default connect(mapStateToProps, null)(Feed);

const styles = StyleSheet.create(
    {
        modalToggle: {
            marginBottom: 12,
            borderWidth: 1,
            borderColor: "#d6d5c9",
            padding: 14,
            borderRadius: 6,
            alignSelf: "center"
        },
        modalClose: {
            marginTop: 60,
            marginBottom: 0
        },
        modalContent: {
            flex: 1
        },
        status: {
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 16,
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#eef"
        }
    }
);