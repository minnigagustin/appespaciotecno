import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions } from "react-native";

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
      <Text style={styles.header_text}>
        {" "}
        Bienvenido, {param_usuario.nombre} {param_usuario.apellido}
      </Text>

      <Image
        source={{ uri: param_usuario.picture }}
        style={{
          height: 150,
          width: 150,
          borderRadius: 150,
          alignSelf: "center",
        }}
      />
      <View style={styles.header}>
        <FontAwesome name="book" size={24} />
        <Text style={styles.title_perfil}>Mis Cursos</Text>
        <FontAwesome name="book" size={24} />
      </View>

      <View style={styles.paneltab}>
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

        <View style={{ flexDirection: "row" }}>
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
      </View>


      <TouchableOpacity
            onPress={() => {
              navigation.navigate("Principal", {
                param_nombre: param_usuario.nombre,
                param_apellido: param_usuario.apellido,
                param_dni: param_usuario.numero_documento,
                param_avatar: param_usuario.picture,
              });
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Volver</Text>
          </TouchableOpacity>

      {mostrarCursos && (
        <FlatList
          data={cursos}
          renderItem={({ item }) => (
            <Curso
              nombre={item.nombre}
              subtitulo={item.subtitulo}
              descripcion={item.descripcion}
              carga={item.carga_horaria_hs}
              fecha={item.fecha_inicio}
              profesor={item.profesor}
            />
          )}
          keyExtractor={(item) => item.nombre}
        />
      )}
      <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {AsyncStorage.clear()}}
              >
                <Text style={styles.textStyle}>Cerrar sesion</Text>
              </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  header_text: {
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
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
