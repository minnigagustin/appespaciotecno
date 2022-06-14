import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";

import React from "react";

import { useNavigation } from "@react-navigation/native";

import { useState } from "react";

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

  return (
    <ImageBackground
      source={require("../assets/fondo_login.jpg")}
      style={{ resizeMode: "stretch", width: width, height: height+30 }}
    >
        <ScrollView>
          <Image
            style={styles.imagen_style}
            resizeMode="contain"
            source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
          />
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

            <View
              style={{
                flexDirection: "row",
                marginBottom: 20,
                alignContent: 'center', alignItems: 'center', alignSelf: 'center', textAlign: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setGenero("m");
                }}
                style={{backgroundColor: genero === "m" ? "#055c6e" : 'white', padding: genero === "m" ? 11: 8, margin: genero === "m" ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === "m" ? 'white' : 'black'}}> Masculino </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGenero("f");
                }}
                backgroundColor="#ffff"
                style={{backgroundColor: genero === "f" ? "#055c6e" : 'white', padding: genero === "f" ? 11 : 8, margin: genero === "f" ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === "f" ? 'white' : 'black'}}> Femenino </Text>
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
    width: width/2.5,
    height: width/2.5,
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
});
