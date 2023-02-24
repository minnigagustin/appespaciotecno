import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions, ImageBackground, Linking, Alert, Switch, ScrollView } from "react-native";

import { FontAwesome } from "react-native-vector-icons";

import React, { useEffect } from "react";

import Curso from "../componentes/curso";

import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Loading from "./Loading";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import { ModalTutor } from "../modals/ModalTutor";
import * as Notifications from 'expo-notifications';
import { axiosLoggedInConfig, BASE_URL } from "../api";
import moment from "moment";

const { width, height } = Dimensions.get("window");
import global from "../componentes/global"

export default function Perfil({ route }) {
  const navigation = useNavigation();

 

  const [cursos, setCursos] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [mostrarCursos, setMostrarCursos] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [TutorVisible, setTutorVisible] = useState(false);
  const toggleSwitch = async () => {
    setModalLoading(true);
    axiosLoggedInConfig().patch(
      BASE_URL + "user/" + perfil.id + '/',
      {token_push: isEnabled ? null : (await Notifications.getExpoPushTokenAsync()).data }
    ).then((resp) => {
      console.log(resp);
      setModalLoading(false);
  }).catch((err)=>{
    console.log(err);
    setModalLoading(false);
  });
    setIsEnabled(previousState => !previousState)
  };

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

  useEffect(() => {
    setModalLoading(true);
  AsyncStorage.getItem("perfil").then((perfil) => {
    if (perfil !== null) {
      const perfilparse = JSON.parse(perfil);
      console.log(perfilparse)
      setPerfil(perfilparse);
    axiosLoggedInConfig().get(BASE_URL + `user/` + perfilparse.id).then((res) => {
        console.log(res.data);
        setIsEnabled(perfilparse.token_push ? true : false);
      });
      axiosLoggedInConfig().get(BASE_URL +`notificacionesalumnos/`).then((res) => {
        const notisdata = res.data.sort((a, b) => a.id < b.id);
        setNotificaciones(notisdata);
      });
      setModalLoading(false);
    } else {
      console.log("NO HAY NADAAA");
    }
  });
}, []);

var nacimiento=moment(perfil.fecha_nacimiento);
var hoy=moment();
var anios= hoy.diff(nacimiento,"years");

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <ModalTutor visibilidad={TutorVisible} salir={() => {setTutorVisible(false)}} />
      <Loading visible={modalLoading}/>
      <ImageBackground
          source={require("../assets/fondo_login.webp")}
          imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 100}}
          style={{ resizeMode: "stretch", width: width, paddingBottom: 20, borderRadius: 20}}
        >
      <Text style={styles.header_text}>
        {" "}
        Tus notificaciones, {param_usuario.nombre}
      </Text>

      <Image
        source={{ uri: param_usuario.picture ? param_usuario.picture : (param_usuario.genero_persona === 'Masculino' ? 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043238-avatar-boy-kid-person_113284.png' : 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043250-avatar-child-girl-kid_113270.png') }}
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

          <TouchableOpacity onPress={toggleSwitch} style={{flexDirection: "row",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: 10,}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="bell" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Notificaciones</Text></View>
            <View>
            <Switch
            style={{margin: -12}}
            trackColor={{ false: "#767577", true: "#a1b94b" }}
        thumbColor={isEnabled ? "white" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /></View>
          </TouchableOpacity>
          {notificaciones.map((item, key)=>{
        return(<TouchableOpacity key={key} onPress={() => Alert.alert(item.notificacion.titulo, item.notificacion.descripcion, [{text: 'Genial!'}]) } style={{flexDirection: "row",
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        padding: 20,
        width: width-40,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 10,}}>
          <View style={{flexDirection: "row"}}>
          <FontAwesome name="bell-o" size={18} />
          <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>{item.notificacion.titulo}</Text></View>
          <View>
          <FontAwesome name="angle-right" size={18} />
          </View>
        </TouchableOpacity>)
               })
             }
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
