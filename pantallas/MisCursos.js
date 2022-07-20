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

 

  const [cursos, setCursos] = useState([]);

  const [cursosFavoritos, setCursosFavoritos] = useState([]);
  const [asistencia, setAsistencia] = useState(0);
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
      const cursos = BASE_URL + "cursosinscriptobyalumno/";
    axiosLoggedInConfig().get(cursos).then((res) => {
      const cursos = res.data;
      setCursos(cursos);
      console.log(cursos);
    });
    const asistencia = BASE_URL + "porcentajeasistenciacursos/";
    axiosLoggedInConfig().get(asistencia).then((res) => {
      const asistenciadata = res.data;
      setAsistencia(asistenciadata.porcentaje_asistencia.split(' ')[0]);
      console.log(asistenciadata);
    });
    } else {
      console.log("NO HAY NADAAA");
    }
  });
}, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <ImageBackground
          source={require("../assets/fondo_login.webp")}
          imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 100}}
          style={{ resizeMode: "stretch", width: width, paddingBottom: 20, borderRadius: 20}}
        >
      <Text style={styles.header_text}>
        {" "}
        Tus cursos, {param_usuario.nombre} {param_usuario.apellido}
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
      <View style={{backgroundColor: 'white', borderRadius: 6, width: width/1.2, height: 90, top: -10, elevation: 7, justifyContent: 'center', alignItems: 'center'}}>
       <Text style={{color: 'green', fontSize: 28, fontWeight: 'bold'}}>{asistencia}/100%</Text>
        <Text style={{color: 'black', fontSize: 14, fontWeight:'600'}}>Asistencia</Text>
      </View>

    

          {cursos.map((item, key)=>{
        return(<View style={{width: width-40,
          borderRadius: 10,padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', elevation: 4, marginTop: 10}}>
            <View>
            <Image source={{ uri: 'https://tecnotest.bahia.gob.ar' + item.picture }}
        style={{
          height: 60,
          width: 60,
          borderRadius: 10,
          alignSelf: "center", 
        }} /></View>
        <View><View>
            <Text style={{fontSize: 14 ,color: 'black', fontWeight: 'bold'}}>{item.nombre}</Text></View>
            <View><Text style={{fontSize: 12, color: 'black'}}>{item.subtitulo}</Text></View></View>
            <View style={{backgroundColor: "rgba(0, 0, 0, 0.02)", padding: 2, borderRadius: 8}}>
            <Entypo name={'magnifying-glass'} size={35} color="green" />
            </View>
          </View>)
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
