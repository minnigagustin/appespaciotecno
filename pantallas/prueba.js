import React, { useEffect, useState } from "react";
// import { Text, View } from "../../../components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Image, Appearance, TouchableOpacity, Text, View } from "react-native";
import { AntDesign, Feather, FontAwesome, Fontisto } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
 
 
 
const RatingScreen = () => {
 
 const navigator = useNavigation();
 const { top } = useSafeAreaInsets();
 const [rating, setRating] = useState('');
 
 
 return (
   <>
       <View style={style.container}>
         <View style={{display: 'flex',
       flexDirection: 'row',
       justifyContent: 'space-between'}}>
         <View style={{width: 50, height: 90, backgroundColor: '#F2F3F5'}}/>
         <View>
         <Text style={{color: 'gray', fontSize: 50}}>#343</Text>
         <Text style={style.headerTitle}>HIGIENE Y LIMPIEZA APP</Text>
         <View style={{display: 'flex',
       flexDirection: 'row',
       justifyContent: 'flex-start', alignItems: 'center'}}>
         <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: 'green'}}/><Text style={{marginLeft: 4,color: 'green', fontSize: 30}}>Completada</Text>
         </View>
         </View>
       </View>
       <View style={{width: '100%'}}>
       <Text style={{fontWeight: 'bold', textAlign: 'left', marginLeft: 10}}>Info del comedor</Text>
       <Text style={{fontWeight: 'bold', textAlign: 'left', marginLeft: 10}}>Diás de retiro</Text>
       <View style={{display: 'flex',
       flexDirection: 'row',
       justifyContent: 'flex-start', alignItems: 'center'}}>
       <Text style={{fontWeight: 'bold', textAlign: 'left', marginLeft: 10}}>Diás de retiro</Text>
       <Text style={{fontWeight: 'bold', textAlign: 'left', marginLeft: 10}}>Horario de retiro</Text>
       
       </View>
       </View>
       <View
 style={{
   borderBottomColor: 'black',
   borderBottomWidth: 0.5,
   width: "90%",
   marginBottom: 4
 }}
/>
           <View style={{width: "100%", marginBottom: 20}}>
       <Text style={style.headerTitle}>Valoramos tu opinion</Text>
       </View>
         <View style={style.foto}>
           <Text style={style.name}>¿Como fue la recepcion?</Text>
         </View>
 
         <View style={{width: "34%",
   flexDirection: "row", justifyContent: 'space-between'}}>
           {/* @ts-ignore */}
           <Fontisto
             onPress={()=> setRating('like')}
             name="like"
             size={46}
             color={rating === 'like' ? 'green' : 'black'}
           />
           <Fontisto 
             onPress={()=> setRating('dislike')}
             name="dislike"
             size={46}
             color={rating === 'dislike' ? 'red' : 'black'}
           />
         </View>
         <TouchableOpacity style={style.button}><Text style={style.buttonText}>CONFIRMAR</Text></TouchableOpacity>
         <TouchableOpacity style={{marginTop: 4}}><Text style={style.omitirText}>Omitir</Text></TouchableOpacity>
       </View>
   </>
 );
};
export default RatingScreen;
 
 
const style = StyleSheet.create({
 container: {
   paddingTop: 20,
   flex: 1,
   // justifyContent: "center",
   alignItems: "center",
   backgroundColor: "white",
 
   // paddingHorizontal: 20,
   // paddingTop: 20,
   // paddingBottom: 100
 },
 header: {
   // backgroundColor: "red",
   width: "100%",
   height: 40,
 },
 headerContent: {
   display: "flex",
   flexDirection: "row",
   flex: 1,
 },
 headerContentText: {
   // backgroundColor: "blue",
   width: "60%",
 },
 headerContentIcon: {
   width: "40%",
   // backgroundColor: "red",
 },
 headerTitle: {
   textAlign: "left",
   fontSize: 20,
   fontWeight: 'bold',
   marginLeft: 10,
 },
 headerIcon: {
   alignSelf: "flex-end",
 },
 icon: {
   width: 125,
   height: 125,
   borderRadius: 100,
 },
 direccion: {
   // flex: 1,
   // backgroundColor: 'red',
   width: "70%",
   flexDirection: "row",
 },
 telefono: {
   // flex: 1,
   marginTop: 20,
   // backgroundColor: 'blue',
   width: "70%",
   flexDirection: "row",
 },
 foto: {
   // marginTop: 100,
   // backgroundColor: 'orange',
   width: "85%",
   justifyContent: "center",
   alignItems: "center",
   flexDirection: "column",
   marginBottom: 40,
 },
 title: {
   marginLeft: 20,
 },
 name: {
   marginTop: 4,
   fontWeight: 'bold'
 },
 button: {
   backgroundColor: '#00965F',
   paddingHorizontal: 100,
   paddingVertical: 8,
   marginTop: 12,
   marginHorizontal: 20,
   alignItems: "center",
},
buttonText: {
   fontSize: 20,
   fontWeight: 'bold',
   color: 'white'
},
omitirText: {
   fontSize: 14,
   color: 'black'
},
});
