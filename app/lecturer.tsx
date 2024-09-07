import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import { globalStyle } from "./style";
import { useRouter } from "expo-router";



export default function Login() {
    const route = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const login = ()=>{
        if(username == 'staff/2024')
            route.push({pathname:"/dashboard", params:{matric:username}});
        else return;
    }
    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ ...styles.container }}>
                <View
                >
                    {/* <Text style={{ ...styles.h4 }}>Registration</Text> */}
                </View>
                <View style={{ ...styles.form }}>
                    <TextInput onChangeText={(e)=>setUsername(e)} keyboardType="default" placeholder="Staff ID" style={{ ...styles.input }} />

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity onPress={login} style={{ ...globalStyle.btnStyle, marginTop: 30 }}>
                            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }} >Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>

    )
}


const styles = StyleSheet.create({
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

    form: {
        elevation: 5,
        padding: 10
    },
    input: {
        width: 300,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        height: 50,
        marginVertical: 2,
    }
})