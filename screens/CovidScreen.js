import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import AnimatedLoader from "react-native-animated-loader";

import {globalStyles} from "../styles/Global";
import Card from "../shared/Card";
import SmallCard from "../shared/SmallCard";

export default function CovidScreen(props) {
    
    const [data, setData] = useState(null);

    useEffect(
        () =>
        {
            fetch("https://api.covid19india.org/v4/min/data.min.json")
            .then((response) => response.json())
            .then(
                (json) => 
                {
                    setData(json.CH);
                    // console.log(json.CH.delta.confirmed);
                }
            );
        }, []
    );

    if(data !== null)
    {
        return(
            <View style = {globalStyles.container}>
                <Card>
                    <Text style = {globalStyles.titleText}>This is the Covid screen </Text>
                    <View style = {styles.status}>
                        <Text>1. Covid cases</Text>
                    </View>
                    <View style = {styles.status}>
                        <Text>2. Vaccination status</Text>
                    </View>
                    <View style = {styles.status}>
                        <Text>3. Covid hotspots</Text>
                    </View>
                </Card>

                <TouchableOpacity 
                    onPress = {
                        () => props.navigation.navigate("CovidCasesDetails", {
                            data
                        })
                    }
                >
                    <View style={{
                      // Try setting `flexDirection` to `"row"`.
                      flexDirection: "row",
                      marginLeft: 25
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
                </TouchableOpacity>
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