import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

import {globalStyles} from "../styles/Global";
import ComplaintForm from "./ComplaintForm";
import Card from "../shared/Card";

export default function Feed()
{
    const [modalOpen, setModalOpen] = useState(false);

    const [reviews, setReviews] = useState(
        [
            { Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '1' },
            { Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne de ', key: '2' },
            { Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '3' },
            { Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '4' },
            { Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '5' },
            { Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '6' },
            { Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '7' },
            { Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '8' },
            { Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '9' },
            { Title: 'An open complaint', Status: "Processing", Body: 'lorem ipsum jatt da muqabla dass mennu kithe ai ni jatt', key: '10' },
            { Title: 'Another open complaint', Status: "Repair in progress", Body: 'lorem ipsum death route vajde salute ai kal kinne dek', key: '11' },
            { Title: 'ek aur open complaint', Status: "Operator assigned", Body: 'lorem ipsum ho gair kanuni yaar mere ghumde firde raatan nu', key: '12' }
        ]
    );

    const addComplaint = (complaint) =>
    {
        console.log(complaint);
        setModalOpen(false);
    }

    return (
        <View style = {globalStyles.container}>
            <Modal visible = {modalOpen} animationType = "slide">
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                    <View style = {styles.modalContent}>
                        <MaterialIcons
                            name = "close"
                            size = {24}
                            style = {{...styles.modalToggle, ...styles.modalClose}}
                            onPress = {() => setModalOpen(false)}
                        />
                        <ComplaintForm addComplaint = {addComplaint} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons
                name = "add"
                size = {24}
                style = {styles.modalToggle}
                onPress = {() => setModalOpen(true)}
            />

            <FlatList
                data = {reviews}
                renderItem = {
                    ({item}) =>
                    (
                        <TouchableOpacity>
                            <Card>
                                <Text style = {globalStyles.titleText}>{item.Title}</Text>
                                <Text>{item.Body}</Text>
                                <View style = {styles.status}>
                                    <Text>Status: {item.Status}</Text>
                                </View>
                                </Card>
                        </TouchableOpacity>
                    )
                }
            />  

        </View>
    )
}

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