
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.text
      }}
    >
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Link href="/login"  style={{...Styles.btnStyle}}>Login</Link>
      <Link href="/register" style={{...Styles.btnStyle}} >Register</Link>
      </View>

      <View style={{justifyContent:"center", paddingVertical:10, alignItems:"flex-end"}}>
        <Link href='/lecturer' style={{
          color:Colors.primary,
          fontSize:25,
        
        }} >I'm a Staff</Link>
      </View>
      
    </View>
  );
}


const Styles = StyleSheet.create({
  btnStyle:{
    backgroundColor:Colors.primary,
    padding:10,
    margin:3,
    borderRadius:5,
    paddingHorizontal:25,
    color:Colors.text,
    fontSize:20,
    fontWeight:"bold"
  }
})