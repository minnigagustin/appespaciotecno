import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import React from "react";
import Curso from "../componentes/curso";
import API from "../api";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function MisCursos({ route }) {

  const navigation = useNavigation();

  const { param_usuario } = route.params;

  const [cursos, setCursos] = useState([]);

  const [cursosFavoritos, setCursosFavoritos] = useState([])

  const [mostrarCursos, setMostrarCursos] = useState(false);

  const [mostrarCursosFavoritos, setMostrarCursosFavoritos] = useState(false);

  const abrirFavoritos = () => {
    getCursos();
    setMostrarCursos(!mostrarCursos);
  };

  const getCursos = () => {
    API.get(`curso/`).then((res) => {
      const cursos = res.data;
      setCursos(cursos);
    });
  };

  const getCursosFavoritos = () => {
    API.get(`comisionesbypersona/`+param_usuario.id).then((res) => {
      const cursos = res.data;
      setCursosFavoritos(cursos);
    });
  }

  return (
    <View>
      <Text style={styles.header_text}>
        {" "}
        Bienvenido, {param_usuario.nombre} {param_usuario.apellido}
      </Text>
      <Image source={{uri:'http://128.0.202.248:8011' + param_usuario.picture}} style={{height: 150, width: 150, borderRadius: 150, alignSelf: 'center'}}/>
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
                param_nombre:  param_usuario.nombre ,
                param_apellido:  param_usuario.apellido ,
                param_dni:  param_usuario.numero_documento,
                param_avatar: param_usuario.picture
              });
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 5 }}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

      </View>

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
});
