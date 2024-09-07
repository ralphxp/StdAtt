import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ActivityIndicatorComponent, Pressable, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, } from "firebase/database";
import { Ionicons } from '@expo/vector-icons';
import { db } from '@/firebaseConfig';



export default function Dashboard() {
    const [isBusy, setIsBusy] = useState(true)
    const [data, setData] = useState({})
    

    const [isClosed, setIsClosed] = useState(false)

    
    const getData = async () => {
        const starCountRef = ref(db, 'attendance/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            // let newData = JSON.parse(data)
            setData({ ...data })
            setIsBusy(false)
        });
    }

    const getAtt = () => {
        const starCountRef = ref(db, 'isCurrent/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setIsClosed(data['state'])
            setIsBusy(false)
        });
    }

   

    useEffect(() => {
        getData()
    }, [])

    const ItemLists = () => {
        const items = [];
        for (let key in data) {
            for (let m in data[key]) {
                items.push(data[key][m])
            }

        }
        return (
            <>
                {
                    items.map((student, id) => (
                        <View key={id} style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            backgroundColor: "white",
                        }}>
                            <Text style={{
                                fontSize: 11,
                                fontWeight: "500",
                                width: "auto"
                            }}>{id + 1}</Text>
                            <Text style={{
                                fontSize: 11,
                                fontWeight: "500",
                                textAlign: "center"
                            }}>{student.matric}</Text>
                            <Text style={{
                                fontSize: 11,
                                fontWeight: "500"
                            }}>{student.time}</Text>
                        </View>
                    ))
                }</>
        )
    }



    return (
        <GestureHandlerRootView style={{ margin: 0, padding: 0 }}>
            <Pressable style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
            }}

                onPress={() => {
                    setIsClosed(!isClosed)
                   
                    if (!isClosed) {
                        alert("Attendance open")
                    } else {
                        alert("Attendance closed")
                    }
                }}

            >
                <Text>Close Attendance</Text>
                {isClosed ? <Ionicons name='toggle-sharp' color={"green"} size={40} style={{
                    elevation: 5,
                    backgroundColor: "#fff",
                    width: "auto",
                    padding: 3,
                    height: "auto"
                }} /> : <Ionicons name='toggle-sharp' color={"black"} size={40} style={{
                    elevation: 5,
                    backgroundColor: "#fff",
                    width: "auto",
                    padding: 3,
                    height: "auto",
                    transform: [
                        { rotateY: "180deg" }
                    ]
                }} />}
            </Pressable>
            {
                isBusy ? <View style={{

                }}>
                    <ActivityIndicator></ActivityIndicator>
                </View> : <SafeAreaView style={{ margin: 0, padding: 0 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        backgroundColor: "white",
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "700",
                            width: "auto",
                            backgroundColor: "#fff",

                        }}>S/N</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "700"
                        }}>Matric</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "700"
                        }}>Time</Text>
                    </View>
                    <ItemLists />
                </SafeAreaView>
            }
        </GestureHandlerRootView>
    )
}

function updateStarCount(postElement: any, data: any) {
    throw new Error('Function not implemented.');
}