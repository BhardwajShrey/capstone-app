import React from "react";
import {StyleSheet, View, Text, FlatList} from "react-native";

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";

export default function VaccinationDetails({navigation, route})
{
    var data = route.params.vaccineData;
    console.log(data);

    return(
        <View style = {globalStyles.container}>

            <FlatList
                data = {data}
                renderItem = {
                    ({item}) =>
                    (
                        <Card>
                            <Text style = {globalStyles.titleText}>{item.address}</Text>
                            <Text>{item.vaccine}</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.mediumText}>Available doses: {item.available_capacity}</Text>
                            </View>

                            <View style = {styles.status}>
                                <Text>Slot 1: {item.slots[0]}</Text>
                            </View>
                            <View style = {styles.status}>
                                <Text>Slot 2: {item.slots[1]}</Text>
                            </View>
                            <View style = {styles.status}>
                                <Text>Slot 3: {item.slots[2]}</Text>
                            </View>
                            <View style = {styles.status}>
                                <Text>Slot 4: {item.slots[3]}</Text>
                            </View>
                        </Card>
                    )
                }
            />

        </View>
    );
}

const styles = StyleSheet.create(
    {
        status: {
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 16,
            marginTop: 16,
            borderTopWidth: 1,
            borderTopColor: "#eef"
        },
        lottie: {
            width: 400,
            height: 400
        }
    }
);