import React from "react";
import {StyleSheet, View, Text} from "react-native";

import {globalStyles} from "../styles/Global";
import SmallCard from "../shared/SmallCard";

export default function CovidCasesDetails({navigation, route})
{
    var data = route.params.casesData;
    
    return(
        <View style = {globalStyles.container}>

            <View style={{
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10
            }}>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>7-Day Average Cases</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.delta7.confirmed}</Text>
                    </View>
                </SmallCard>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Covid Cases</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.total.confirmed}</Text>
                    </View>
                </SmallCard>
            </View>

            <View style={{
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10
            }}>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Population</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.meta.population}</Text>
                    </View>
                </SmallCard>
            </View>

            <View style={{
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10
            }}>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Infected</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.total.confirmed}</Text>
                    </View>
                </SmallCard>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Recovered</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.total.recovered}</Text>
                    </View>
                </SmallCard>
            </View>

            <View style={{
              flexDirection: "row",
              marginLeft: 10,
              marginRight: 10
            }}>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Tested</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.total.tested}</Text>
                    </View>
                </SmallCard>
                <SmallCard>
                    <Text style = {globalStyles.titleText}>Total Vaccinated</Text>
                    <View style = {styles.status}>
                        <Text style = {globalStyles.bigText}>{data.total.vaccinated}</Text>
                    </View>
                </SmallCard>
            </View>
            

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