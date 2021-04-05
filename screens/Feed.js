import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

function Feed(props)
{
    // const [complaints, setComplaints] = useState(
    //     [
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '1' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne de ', key: '2' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '3' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '4' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '5' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '6' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '7' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '8' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '9' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '10' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '11' },
    //         { Location: "Main road mandir ke saamne ekdum", Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '12' }
    //     ]
    // );

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