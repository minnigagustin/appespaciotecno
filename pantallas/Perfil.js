import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions, ImageBackground, Linking, Alert, Switch, ScrollView } from "react-native";

import { FontAwesome } from "react-native-vector-icons";

import React, { useEffect } from "react";

import Curso from "../componentes/curso";
import * as ImagePicker from 'expo-image-picker';
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
  const [cursosFavoritos, setCursosFavoritos] = useState([]);
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

  const getCursosFavoritos = () => {
    BASE_URL.get(`comisionesbypersona/` + param_usuario.id).then((res) => {
      const cursos = res.data;
      setCursosFavoritos(cursos);
    });
  };
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
      setModalLoading(false);
    } else {
      console.log("NO HAY NADAAA");
    }
  });
}, []);
async function takeAndUploadPhotoAsync() {
  // Display the camera to the user and wait for them to take a photo or to cancel
  // the action
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.cancelled) {
    return;
  }

  // ImagePicker saves the taken photo to disk and returns a local URI to it
  let localUri = result.uri;
  let filename = localUri.split('/').pop();

  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;

  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  formData.append('picture', { uri: localUri, name: filename, type });

  return await axiosLoggedInConfig().patch(
    BASE_URL + "user/" + perfil.id + '/',
    formData
  ).then((resp) => {
    console.log(resp);
    setModalLoading(false);
}).catch((err)=>{
  console.log(err);
  setModalLoading(false);
});
}

const elegirFoto = () => {
  Alert.alert(
    'Cambiar foto de perfil',
    '',
    [
      {text: 'Tomar foto', onPress: () => takeAndUploadPhotoAsync()},
      {text: 'Elegir de galeria', onPress: () => this._pickImage()},
    ],
    {cancelable: true},
  );
};


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
        Bienvenido, {param_usuario.nombre}
      </Text>
    <TouchableOpacity onPress={elegirFoto}>
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
      /></TouchableOpacity></ImageBackground>{anios < 18 && !perfil.declaracion_jurada &&
      <TouchableOpacity onPress={() => {
              setTutorVisible(true);
            }} style={{flexDirection: "row",
          backgroundColor: "rgba(255, 204, 0, 1)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          top: -10}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="exclamation-triangle" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Tu tutor debe verificar tu identidad</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} /></View>
          </TouchableOpacity>}

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

          
          {/* onPress={() => {
              navigation.navigate("Cate", { screen: "EditarPerfil" })
            }} */}

          <TouchableOpacity  onPress={() => {
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

          <TouchableOpacity onPress={() => {
              navigation.navigate("Cate", { screen: "Notificaciones" })
            }} style={{flexDirection: "row",
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          padding: 20,
          width: width-40,
          borderRadius: 20,
          justifyContent: 'space-between',
          alignItems: "center",
          marginTop: 10,}}>
            <View style={{flexDirection: "row"}}>
            <FontAwesome name="bell-o" size={18} />
            <Text style={{marginLeft: 12 ,color: 'black', fontSize: 14, fontWeight: 'bold'}}>Notificaciones</Text></View>
            <View>
            <FontAwesome name="angle-right" size={18} />
            </View>
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
          <TouchableOpacity >
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
