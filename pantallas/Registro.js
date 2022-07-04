import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import React from "react";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { BarCodeScanner } from "expo-barcode-scanner";


import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";

import axios from "axios";

import { ModalRegistroOk } from "../modals/ModalRegistroOk";

import { BASE_URL } from "../api";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Registro() {
  const [nombre, setNombre] = useState("");

  const [apellido, setApellido] = useState("");

  const [dni, setDni] = useState("");

  const [email, setEmail] = useState("");

  const [localidad, setLocalidad] = useState("");

  const [genero, setGenero] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [escanea, setEscanea] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [nivel, setNivel] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);

  const [contrasenia, setContrasenia] = useState("");

  const [loading, setLoading] = useState(false);

  const [modalOk, setModalOk] = useState(false);

  const formData = {};

  const navigation = useNavigation();

  const actualizarNombre = (text_user) => {
    setNombre(text_user);
  };

  const actualizarApellido = (text_user) => {
    setApellido(text_user);
  };

  const actualizarDni = (text_user) => {
    setDni(text_user);
  };

  const actualizarMail = (text_user) => {
    setEmail(text_user);
  };

  const actualizarLocalidad = (text_user) => {
    setLocalidad(text_user);
  };

  const actualizarContrasenia = (text_user) => {
    setContrasenia(text_user);
  };

  const verificarRegistro = async () => {
    await axios.get(BASE_URL + "logout/");

    if (checkCampos()) {
      enviarRegistro();

      actualizarStates();
    } else Alert.alert("POR FAVOR, COMPLETE LOS CAMPOS SOLICITADOS");
  };

  const checkCampos = () => {
    if (
      nombre !== "" &&
      apellido !== "" &&
      dni !== "" &&
      localidad !== "" &&
      genero !== "" &&
      contrasenia !== ""
    )
      return true;
    else return false;
  };

  const enviarRegistro = async () => {
    formData.nombre = nombre;

    formData.apellido = apellido;

    formData.numero_documento = dni;

    formData.email = email;

    formData.localidad = localidad;

    formData.genero = genero;

    formData.password = contrasenia;

    formData.picture = null;

    axios({
      url: BASE_URL + "user/",

      method: "POST",

      data: formData,
    }).then((result) => {
      if (result.status === 200) {
        navigation.navigate("Principal", {
          param_usuario: result.data,
        });
      }
    });
  };

  const actualizarStates = () => {
    setLoading(true);

    setModalOk(true);

    resetCampos();
  };

  const restoreModalOk = () => {
    setModalOk(false);
  };

  const regresarScreen = () => {
    resetCampos();

    navigation.goBack();
  };

  const resetCampos = () => {
    setNombre("");

    setApellido("");

    setDni("");

    setEmail("");

    setLocalidad("");

    setGenero("");

    setContrasenia("");
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setDni(data.split('@')[4]);
    setApellido(data.split('@')[1]);
    setNombre(data.split('@')[2].split(' ')[0]);
    setGenero(data.split('@')[3]);
    setModalVisible(false);
  };

  if (hasPermission === null) {
    return <Text>Admita el permiso a la camara</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin acceso a camara</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/fondo_login.jpg")}
      style={{ resizeMode: "stretch", width: width, height: height+30 }}
    >
        <ScrollView>
        <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Login cancelado", "No ingresaste tu DNI");
          setModalVisible(!modalVisible);
        }}
      ><ImageBackground
      source={require("../assets/fondo_login.jpg")}
      style={{ resizeMode: "stretch", width: width, height: height + 30 }}
    >
        <View style={styles.centeredView}>
        <Text style={{color: "white",
    fontSize: width/20,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Roboto",}}>Ingresa tu <Text style={{fontWeight: 'bold', color: 'white'}}>DNI</Text></Text>
          <View style={[styles.modalView, {
    backgroundColor: escanea ? "white" : null,}]}>
            <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{height: width*0.80, width: width*0.65}}
      />
         
          </View>

        </View>
        </ImageBackground>
      </Modal>
          <Image
            style={styles.imagen_style}
            resizeMode="contain"
            source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
          /><TouchableOpacity onPress={() => setModalVisible(true)} style={{borderRadius: 30,
            borderColor: "black",
            paddingVertical: 6,
            paddingHorizontal: 48,
            marginBottom: 10,
            backgroundColor: "#017185",
            alignSelf: "center",}}>
          <Text style={{color: "white",
    fontSize: width/20,
    textAlign: "center",
    fontFamily: "Roboto",}}>Escanea tu <Text style={{fontWeight: 'bold', color: 'white'}}>DNI</Text></Text></TouchableOpacity>
    {nivel ? (
      <View>
          <View style={{flex: 1,
    flexDirection: "row", alignContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center'}}>
            <TextInput
              style={{
              fontSize: 20,
              marginBottom: 20,
              borderRadius: 30,
              marginRight: 5,
              borderColor: "#90C641",
              width: width / 2.7,
              padding: 10,
              backgroundColor: "white",}}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Nombre"}
              color="black"
              onChangeText={(text_user) => actualizarNombre(text_user)}
              value={nombre}
            ></TextInput>

            <TextInput
              style={{
              fontSize: 20,
              marginBottom: 20,
              borderRadius: 30,
              borderColor: "#90C641",
              width: width / 2.7,
              padding: 10,
              backgroundColor: "white",}}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Apellido"}
              onChangeText={(text_user) => actualizarApellido(text_user)}
              value={apellido}
            ></TextInput>
            </View>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Ingrese su DNI"}
              onChangeText={(text_user) => actualizarDni(text_user)}
              value={dni}
            ></TextInput>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Email"}
              keyboardType="email-address"
              onChangeText={(text_user) => actualizarMail(text_user)}
              value={email}
            ></TextInput>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Localidad"}
              onChangeText={(text_user) => actualizarLocalidad(text_user)}
              value={localidad}
            ></TextInput>
            
            <TouchableOpacity onPress={() => setNivel(!nivel)} style={{borderRadius: 30,
            borderColor: "black",
            paddingVertical: 6,
            paddingHorizontal: 48,
            marginBottom: 10,
            backgroundColor: "#017185",
            alignSelf: "center",}}>
          <Text style={{color: "white",
    fontSize: width/20,
    textAlign: "center",
    fontFamily: "Roboto",}}><Text style={{fontWeight: 'bold', color: 'white'}}>Siguiente {'>>'}</Text></Text></TouchableOpacity>
    </View>) : (<View>
      <TouchableOpacity onPress={() => setNivel(!nivel)} style={{borderRadius: 30,
            borderColor: "black",
            paddingVertical: 6,
            paddingHorizontal: 48,
            marginBottom: 10,
            backgroundColor: "#017185",
            alignSelf: "center",}}>
          <Text style={{color: "white",
    fontSize: width/20,
    textAlign: "center",
    fontFamily: "Roboto",}}><Text style={{fontWeight: 'bold', color: 'white'}}>{'<<'} Retroceder</Text></Text></TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGenero("M");
                }}
                style={{backgroundColor: genero === "M" ? "#055c6e" : 'white', padding: genero === "M" ? 11: 8, margin: genero === "M" ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === "M" ? 'white' : 'black'}}> Masculino </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGenero("F");
                }}
                backgroundColor="#ffff"
                style={{backgroundColor: genero === "F" ? "#055c6e" : 'white', padding: genero === "F" ? 11 : 8, margin: genero === "F" ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === "F" ? 'white' : 'black'}}> Femenino </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              placeholderTextColor="#000"
              placeholder={"Escriba una contraseña"}
              secureTextEntry={true}
              onChangeText={(text_user) => actualizarContrasenia(text_user)}
              value={contrasenia}
            ></TextInput>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              placeholderTextColor="#000"
              secureTextEntry={true}
              placeholder={"Confirme su contraseña"}
            ></TextInput>

            <TouchableOpacity
              style={styles.ingresar_style}
              onPress={() => {
                verificarRegistro();
              }}
            >
              <Text style={styles.ingresar_text}>REGISTRARSE</Text>
            </TouchableOpacity>
            </View>
            )}
        </ScrollView>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {modalOk && (
        <ModalRegistroOk
          state={modalOk}
          restore={restoreModalOk}
          user={formData}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  imagen_style: {
    alignSelf: "center",
    marginTop: 90,
    marginBottom: 50,
    width: scale(130),
    height: scale(130),
  },
  logo_container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -45,
    marginBottom: 30,
  },
  logo_style: {
    width: 120,
    height: 80,
    margin: 3,
    resizeMode: "contain",
  },
  input_style: {
    alignSelf: "center",
    alignItems: "stretch",
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "#90C641",
    width: width / 1.25,
    padding: 10,
    backgroundColor: "white",
  },
  ingresar_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 48,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignSelf: "center",
  },
  regresar_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignSelf: "center",
  },
  registrarse_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 48,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "center",
  },
  ingresar_text: {
    fontSize: 13,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
    fontFamily: "Roboto",
  },
  crear_style: {
    borderRadius: 300 / 40,
    borderColor: "black",
    backgroundColor: "#4496c5",
    alignSelf: "center",
    marginBottom: 20,
  },
  crear_text: {
    fontSize: 20,
    color: "white",
    marginVertical: 5,
    marginHorizontal: 5,
    fontFamily: "Roboto",
  },
  recuperar_text: {
    color: "white",
    fontSize: 19,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  ingresar_text: {
    fontSize: 25,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
  },
  recuperar_text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 20,
    padding: 4,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
