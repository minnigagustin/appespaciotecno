import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions, ImageBackground, Linking } from "react-native";

import { Entypo } from "react-native-vector-icons";

import React, { useEffect } from "react";

import Curso from "../componentes/curso";

import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { axiosLoggedInConfig, BASE_URL } from "../api";

const { width, height } = Dimensions.get("window");
import global from "../componentes/global"

export default function Perfil({ route }) {
  const navigation = useNavigation();

 

  const [cursosFavoritos, setCursosFavoritos] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [mostrarCursos, setMostrarCursos] = useState(false);

  const abrirFavoritos = () => {
    setMostrarCursos(!mostrarCursos);
  };

  const param_usuario  = perfil;

  useEffect(() => {
  AsyncStorage.getItem("perfil").then((perfil) => {
    if (perfil !== null) {
      const perfilparse = JSON.parse(perfil);
      setPerfil(perfilparse);
    } else {
      console.log("NO HAY NADAAA");
    }
  });
  AsyncStorage.getItem('favoritos').then((cart)=>{
    if (cart !== null) {
      // We have data!!
      const cartfood = JSON.parse(cart)
      setCursosFavoritos(cartfood);
    }
  })
  .catch((err)=>{
    alert(err)
  })
}, []);

const eliminarCursos = (i) => {
  const beta = cursosFavoritos;
  beta.splice(i,1);
  AsyncStorage.setItem('favoritos',JSON.stringify(beta));
  setCursosFavoritos([...beta]);
};


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <ImageBackground
          source={require("../assets/fondo_login.jpg")}
          imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 100}}
          style={{ resizeMode: "stretch", width: width, paddingBottom: 20, borderRadius: 20}}
        >
      <Text style={styles.header_text}>
        {" "}
        Tus favoritos, {param_usuario.nombre} {param_usuario.apellido} <Entypo name={'heart'} size={18} color="white" />
      </Text>

      <Image
        source={{ uri: param_usuario.picture ? param_usuario.picture : 'https://espaciotecno.bahia.gob.ar/images/isotipo.jpg' }}
        style={{
          height: 150,
          width: 150,
          overflow: "hidden",
    borderWidth: 4,
    borderColor: "white",
          borderRadius: 150,
          alignSelf: "center",
        }}
      /></ImageBackground>

      {/* <View style={styles.paneltab}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome name="heart" size={18} />
          <TouchableOpacity
            onPress={() => {
              abrirFavoritos();
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Favoritos</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", borderRadius: 5, }}>
          <FontAwesome name="edit" size={18} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditarPerfil", {
                param_nombre: param_usuario.nombre,
                param_apellido: param_usuario.apellido,
                param_dni: param_usuario.numero_documento,
                param_avatar: param_usuario.picture,
              });
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
          </View> */}
        
        {cursosFavoritos.map((item, key)=>{
        return(<TouchableOpacity onLongPress={() => { eliminarCursos(key)}} key={key} style={{width: width-40,
          borderRadius: 10,padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', elevation: 4, marginTop: 10}}>
            <View>
            <Image source={{ uri: item.picture }}
        style={{
          height: 60,
          width: 60,
          borderRadius: 10,
          alignSelf: "center", 
        }} /></View>
        <View><View>
            <Text style={{fontSize: 14 ,color: 'black', fontWeight: 'bold'}}>{item.nombre}</Text></View>
            <View><Text style={{fontSize: 12, color: 'black'}}>{item.descripcion}</Text></View></View>
            <View style={{backgroundColor: "rgba(0, 0, 0, 0.02)", padding: 2, borderRadius: 8}}>
            <Entypo name={'rocket'} size={35} color="green" />
            </View>
          </TouchableOpacity>)
               })
             }

          

          


      
          <TouchableOpacity  onPress={() => Linking.openURL('https://digital.bahia.gob.ar/')}>
              <Image  source={{ uri: 'https://digital.bahia.gob.ar/espaciotecno/LOGO-APP.gif' }} style={{width: width/1.5, height: 120}} resizeMode="contain" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header_text: {
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: 'white',
    fontFamily: "Roboto",
    textAlign: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title_perfil: {
    textAlign: "center",
    fontSize: 24,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
  paneltab: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    marginTop: 24,
    padding: 10,
    width: width/1.3,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#0086bf",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
});
