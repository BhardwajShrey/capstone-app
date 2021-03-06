import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create(
    {
        container: {
            paddingTop: 30,
            flex: 1,
            backgroundColor: "#dedee0"
        },
        container2: {
            paddingTop: 30,
            flex: 1,
            backgroundColor: "#fcfcfc"
        },
        titleText: {
            fontSize: 18,
            color: "#333"
        },
        paragraph: {
            marginVertical: 8,
            lineHeight: 20
        },
        input: {
            borderWidth: 1,
            borderColor: "#ddd",
            padding: 10,
            fontSize: 18,
            borderRadius: 6,
            marginHorizontal: 45,
        },
        errorText: {
            color: "crimson",
            marginBottom: 10,
            marginTop: 6,
            textAlign: "center"
        },
        bigText: {
            fontSize: 30,
            color: "#333",
            fontWeight: "bold"
        },
        mediumText: {
            fontSize: 20,
            color: "#333",
            fontWeight: "bold"
        }
    }
);