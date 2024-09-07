import React, { useEffect, useState } from "react";
import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyle } from "./style";
import WebView from "react-native-webview";
import * as Location from 'expo-location';
import * as LocalAuthentication from 'expo-local-authentication';
import { getDatabase, ref, set } from "firebase/database";
import MapView from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import { db } from "@/firebaseConfig";

export default function Gps() {
    const [latideClass, setLatitudeClass] = useState(9.9491126);
    const [longClass, setLongitudeClass] = useState(9.9491126);
    const [location, setLocation] = useState<Location.LocationObject>();
    const [errorMsg, setErrorMsg] = useState('');
    const date = new Date()
    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    const params = useLocalSearchParams()
    const {matric} = params
    console.log(params)
    const [state, setState] = useState({
        time: time,
        date: day,
        location: {},
        matric: matric
    })

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setState({...state, location:location})
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const getFinerprint = async () => {
        const { success } = await LocalAuthentication.authenticateAsync()
        if (success) {
            if (await writeUserData(state)) {
                alert('done')
            }
        } else {
            alert('done')
            await writeUserData(state)
        }
    }

    async function writeUserData(state: any) {

        await set(ref(db, 'attendance/' + day.replaceAll('/', '_') + '/' + state.matric.replaceAll('/', '_')), {
            ...state
        });

        return true
    }
    const mapKey = "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"

    return (
        <GestureHandlerRootView>
            <SafeAreaView style={{ ...globalStyle.container }}>
                <View style={{ alignItems: "center" }}>
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ ...styles.text }}>Class Lat: {latideClass}</Text>
                        <Text style={{ ...styles.text }}>Class Long: {latideClass}</Text>
                        <Text>{''}</Text>
                        <Text style={{ ...styles.text }}>Your Lat: {location?.coords?.longitude}</Text>
                        <Text style={{ ...styles.text }}>Your Long: {location?.coords?.latitude}</Text>
                    </View>

                    <View style={{ padding: 10, alignItems: "center" }}>
                        <Text style={{ ...globalStyle.h4, color: "rgb(32, 90, 191)" }}>In Range</Text>
                        <Text style={{ ...globalStyle.h4, fontWeight: "300" }}>{(location?.coords?.accuracy < 100)?"YES":"NO"}</Text>
                    </View>

                    <View style={{ padding: 10, alignItems: "center" }}>
                        <Text style={{ ...globalStyle.h4, color: "rgb(32, 90, 191)" }}>Distance from class</Text>
                        <Text style={{ ...globalStyle.h4, fontWeight: "300" }}>{location?.coords?.accuracy}M</Text>
                    </View>

                    <TouchableOpacity onPress={getFinerprint} style={{ ...globalStyle.btnStyle, width: Dimensions.get('screen').width * 0.5, alignItems: 'center' }}>
                        <Text style={{ ...globalStyle.h4, fontSize: 18, color: "white" }}>PROCEED</Text>
                    </TouchableOpacity>
                    {location?.coords &&
                    <MapView
                        style={{
                            flex: 1,
                            backgroundColor: "gray",
                            width: Dimensions.get("screen").width
                        }}

                        initialRegion={{
                            latitude:location?.coords?.latitude, 
                            longitude:location?.coords?.longitude,
                            longitudeDelta:0.21,
                            latitudeDelta:0.1,
                            
                        }}
                        zoomControlEnabled={true}
                        showsMyLocationButton={true}
                        mapType="standard"
                    /> }

                    {/* <WebView
                        source={{ uri: `http://maps.google.com/maps/place/${location?.coords?.longitude},${location?.coords?.latitude}` }}
                        style={{
                            flex: 1,
                            backgroundColor: "gray",
                            width: Dimensions.get("screen").width
                        }} /> */}



                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    }
})


