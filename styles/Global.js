import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create(
    {
        container: {
            paddingTop: 30,
            flex: 1
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
            marginHorizontal: 45
        },
        errorText: {
            color: "crimson",
            marginBottom: 10,
            marginTop: 6,
            textAlign: "center"
        }
    }
);