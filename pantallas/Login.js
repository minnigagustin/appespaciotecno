import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
} from "react-native";

import React from "react";

import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";

import axios from "axios";

import { BASE_URL } from "../api";

import global from "../componentes/global"

import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height;

export default function Login({ route }) {
  const [dni, setDni] = useState("");

  const [loading, setLoading] = useState(false);

  const [contrasenia, setContrasenia] = useState("");

  const navigation = useNavigation();

  const actualizarUser = (text_user) => {
    setDni(text_user);
  };

  const actualizarContra = (text_contra) => {
    setContrasenia(text_contra);
  };

  const chequearValidacion = () => {
    Keyboard.dismiss();

    setLoading(true);

    verificarUsuario();

    resetearCampos();
  };

  

  useEffect(() => {
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        const numero = JSON.parse(perfil);

        setDni(String(numero.numero_documento));
      } else {
        console.log("NO HAY NADAAA");
      }
    });
  }, []);

  const verificarUsuario = async () => {
    const formData = {};

    const url_logout = BASE_URL + "logout/";

    const url_login = BASE_URL + "login/";

    console.log(url_login);

    await axios.get(url_logout);

    formData.numero_documento = dni;

    formData.password = contrasenia;

    console.log(formData);

    axios({
      url: url_login,

      method: "POST",

      data: formData,
    })
      .then((response) => {
        if (response.status === 200) {

          global.authenticated = true;

          setLoading(false);

          AsyncStorage.setItem("perfil", JSON.stringify(response.data));

          navigation.navigate("Principal", {
            param_usuario: response.data,
          });
        }
      })

      .catch(function () {
        // handle error

        Alert.alert("ALERTA!", "DNI O CONTRASEÑA INCORRECTA");

        setLoading(false);
      });
  };

  const resetearCampos = () => {
    setDni("");

    setContrasenia("");
  };

  return (
    <ImageBackground
      source={require("../assets/fondo_login.jpg")}
      style={{ resizeMode: "stretch", width: width, height: height + 30 }}
    >
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#FFFFFF"
            style={{
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              bottom: 120,
            }}
          />
        )}

        <Image
          style={styles.imagen_style}
          resizeMode="contain"
          source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
        />
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={25}>
          <TextInput
            style={styles.input_style}
            textAlign={"center"}
            placeholderTextColor="#000"
            keyboardType="numeric"
            placeholder={"Usuario (DNI)"}
            onChangeText={(text_user) => actualizarUser(text_user)}
            value={dni}
          ></TextInput>

          <TextInput
            style={styles.input_style}
            textAlign={"center"}
            placeholderTextColor="#000"
            placeholder={"Contraseña"}
            onChangeText={(text_contra) => actualizarContra(text_contra)}
            value={contrasenia}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity
            style={[
              styles.ingresar_style,
              {
                backgroundColor:
                  dni && contrasenia ? "#017185" : "rgba(0, 0, 0, 0.15)",
              },
            ]}
            onPress={() => chequearValidacion()}
            disabled={!dni || !contrasenia}
          >
            <Text style={styles.ingresar_text}>INGRESAR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ color: "white", marginTop: 4 }}
            onPress={() => navigation.navigate("Recuperar")}
          >
            <Text style={styles.recuperar_text}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>

      <View
        style={{
          bottom: 41,
          position: "relative",
        }}
      >
        <TouchableOpacity
          style={{ color: "white" }}
          onPress={() => navigation.navigate("Registro")}
        >
          <Text style={styles.recuperar_text}>
            ¿No tienes un usuario?{" "}
            <Text style={{ fontWeight: "bold" }}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 80,
    width: 150,
    height: 150,
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
