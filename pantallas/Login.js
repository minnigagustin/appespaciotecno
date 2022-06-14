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
import { Entypo } from "react-native-vector-icons"
import React from "react";

import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";

import * as Facebook from 'expo-facebook';

import axios from "axios";

import { BASE_URL } from "../api";

import global from "../componentes/global";

import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;

const height = Dimensions.get("window").height;

async function logIn() {
  try {
    await Facebook.initializeAsync({
      appId: '584511442999527', facebookDisplayName: 'Espacio Tecno'
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
      Alert.alert('Cancelado', `Inicio de sesion cancelado`);
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export default function Login({}) {
  const [dni, setDni] = useState("");

  const [loading, setLoading] = useState(false);

  const [contrasenia, setContrasenia] = useState("");

  const [usuario, setUsuario] = useState("");

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
        global.authenticated = false;
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
          console.log(global.authenticated);
          setLoading(false);
          AsyncStorage.setItem("perfil", JSON.stringify(response.data));

          navigation.replace("HomeInicio");

          console.log(global.authenticated)
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
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={15} enabled>

        <Image
          style={styles.imagen_style}
          resizeMode="contain"
          source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
        />
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
          <TouchableOpacity style={{backgroundColor: '#4267b2',
    paddingVertical: 10,
    paddingHorizontal: 10, marginTop: 34,
    borderRadius: 20, alignItems: 'center'}} onPress={logIn}>
          <Text style={{ color: "#fff", fontSize: width/28 }}><Entypo name={'facebook'} size={16} color="white" /> Inicia sesion con <Text style={{ fontWeight: 'bold' }}>Facebook</Text></Text>
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      
      <View
        style={{
          bottom: 50,
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
    fontSize: width/22,
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
  ingresar_text: {
    fontSize: width/22,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
  },
  recuperar_text: {
    color: "white",
    fontSize: width/26,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Roboto",
  },
});
