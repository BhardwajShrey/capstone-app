import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import AnimatedLoader from "react-native-animated-loader";

import {globalStyles} from "../styles/Global";
import SmallCard from "../shared/SmallCard";

export default function CovidScreen(props) {
    
    const [casesData, setCasesData] = useState(null);
    const [vaccineData, setVaccineData] = useState(null)

    useEffect(
        () =>
        {
            fetch("https://api.covid19india.org/v4/min/data.min.json")
            .then((response) => response.json())
            .then(
                (json) => 
                {
                    setCasesData(json.CH);
                    // console.log(json.CH.delta7.confirmed);
                }
            );

            fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=108&date=03-06-2021")
            .then((response) => response.json())
            .then(
                (json) => 
                {
                    var temp = json.sessions.filter(session => session.available_capacity > 0);
                    // console.log(temp);
                    setVaccineData(temp);
                    // console.log(json.CH.delta7.confirmed);
                }
            );
        }, []
    );

    if(casesData !== null)
    {
        return(
            <View style = {globalStyles.container}>
                <TouchableOpacity 
                    onPress = {
                        () => props.navigation.navigate("CovidCasesDetails", {
                            casesData
                        })
                    }
                >
                    <View style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginRight: 10
                    }}>
                        <SmallCard>
                            <Text style = {globalStyles.titleText}>7-Day Average Cases</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.bigText}>{casesData.delta7.confirmed}</Text>
                            </View>
                        </SmallCard>
                        <SmallCard>
                            <Text style = {globalStyles.titleText}>Total Covid Cases</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.bigText}>{casesData.total.confirmed}</Text>
                            </View>
                        </SmallCard>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress = {
                        () => props.navigation.navigate("VaccinationDetails", {
                            vaccineData
                        })
                    }
                >
                    <View style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginRight: 10
                    }}>
                        <SmallCard>
                            <Text style = {globalStyles.titleText}>Vaccination Slots for 03-06-2021</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.bigText}>Available</Text>
                            </View>
                        </SmallCard>
                    </View>

                    <View style={{
                      flexDirection: "row",
                      marginLeft: 10,
                      marginRight: 10
                    }}>
                        <SmallCard>
                            <Text style = {globalStyles.titleText}>Total Recovered</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.bigText}>{casesData.total.recovered}</Text>
                            </View>
                        </SmallCard>
                        <SmallCard>
                            <Text style = {globalStyles.titleText}>Total Vaccinated</Text>
                            <View style = {styles.status}>
                                <Text style = {globalStyles.bigText}>{casesData.total.vaccinated}</Text>
                            </View>
                        </SmallCard>
                    </View>
                </TouchableOpacity>

                <View style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 25,
                  alignItems: "center"
                }}>
                    <Text>Last Updated: {casesData.meta.last_updated}</Text>
                </View>
            </View>
        );
    }
    else
    {
        return (
            <View style = {globalStyles.container}>
                <AnimatedLoader
                    visible = {true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../assets/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                    loop = {true}
                >
                    <Text>Loading data...</Text>
                </AnimatedLoader>
            </View>
        )
    }
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