import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions, ImageBackground, Linking, Alert } from "react-native";

import { FontAwesome } from "react-native-vector-icons";

import React, { useEffect } from "react";

import Curso from "../componentes/curso";

import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";


import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { BASE_URL } from "../api";

const { width, height } = Dimensions.get("window");
import global from "../componentes/global"

export default function Perfil({ route }) {
  const navigation = useNavigation();

 

  const [cursos, setCursos] = useState([]);

  const [cursosFavoritos, setCursosFavoritos] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [mostrarCursos, setMostrarCursos] = useState(false);

  const abrirFavoritos = () => {
    getCursos();

    setMostrarCursos(!mostrarCursos);
  };

  const getCursos = () => {
    BASE_URL.get(`curso/`).then((res) => {
      const cursos = res.data;
      setCursos(cursos);
    });
  };
  const param_usuario  = perfil;

  const getCursosFavoritos = () => {
    BASE_URL.get(`comisionesbypersona/` + param_usuario.id).then((res) => {
      const cursos = res.data;
      setCursosFavoritos(cursos);
    });
  };
  useEffect(() => {
  AsyncStorage.getItem("perfil").then((perfil) => {
    if (perfil !== null) {
      const perfilparse = JSON.parse(perfil);
      console.log(perfilparse)
      setPerfil(perfilparse);
    } else {
      console.log("NO HAY NADAAA");
    }
  });
}, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <ImageBackground
          source={require("../assets/fondo_login.jpg")}
          imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 100}}
          style={{ resizeMode: "stretch", width: width, paddingBottom: 20, borderRadius: 20}}
        >
      <Text style={styles.header_text}>
        {" "}
        Bienvenido, {param_usuario.nombre} {param_usuario.apellido}
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

          <TouchableOpacity onPress={() => {
              Alert.alert('Ups! Estamos trabajando...', 'Proximamente vas a poder editar tu perfil en segundos ;)')
            }} style={{flexDirection: "row",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: 10,}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="user-o" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Editar Perfil</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} /></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              navigation.navigate("Cate", { screen: "MisFavoritos" })
            }}  style={{flexDirection: "row",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: 10,}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="heart-o" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Favoritos</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} /></View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
              navigation.navigate("Cate", { screen: "MisCursos" })
            }} style={{flexDirection: "row",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: 10,}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="calendar-o" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Cursos</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} /></View>
          </TouchableOpacity>
          


      <TouchableOpacity
                style={{flexDirection: "row",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
                padding: 20,
                width: width-40,
                borderRadius: 20,
                justifyContent: 'space-between',
                alignItems: "center",
                marginTop: 10,}}
                onPress={() => {AsyncStorage.clear(), navigation.replace("LoginNavegacion");}}
              >
                <View style={{flexDirection: "row"}}>
            <FontAwesome name="external-link" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Cerrar sesion</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} /></View>
              </TouchableOpacity>
          <TouchableOpacity  onPress={() => Linking.openURL('https://digital.bahia.gob.ar/')}>
              <Image  source={{ uri: 'https://digital.bahia.gob.ar/espaciotecno/LOGO-APP.gif' }} style={{width: width/1.5, height: 120}} resizeMode="contain" />
      </TouchableOpacity>
    </View>
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
