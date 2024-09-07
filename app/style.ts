import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({

    btnStyle: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 3,
        borderRadius: 5,
        paddingHorizontal: 25,
        color: Colors.text,
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background
    },
    h4: {
        fontSize: 25,
        fontWeight: "700"
    },
})