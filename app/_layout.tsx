import { Stack } from "expo-router";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";


export default function RootLayout() {


  
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ statusBarHidden: true, headerShown: false }} />
      <Stack.Screen name="register" options={{ statusBarHidden: true, headerShown: true, title: "Attendance" }} />
      <Stack.Screen name="login" options={{ statusBarHidden: true, title: "Attendance" }} />
      <Stack.Screen name="gps" options={{ statusBarHidden: true, title: "Map" }} />
      <Stack.Screen name="dashboard" options={{ statusBarHidden: true, title: "Attendance List" }} />
    </Stack>
  );
}

