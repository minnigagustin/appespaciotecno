import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";

import { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Login() {
  const [email, setEmail] = useState("");

  const actualizarMail = (text_user) => {
    setEmail(text_user);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo_login.jpg")}
      style={{ resizeMode: "stretch", width: width, height: height }}
    >
      <View style={styles.container}>
        <Image
          style={styles.imagen_style}
          resizeMode="contain"
          source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
        />

        <TextInput
          style={styles.input_style}
          textAlign={"center"}
          placeholderTextColor="#000"
          keyboardType="email-address"
          placeholder={"Ingrese su email"}
          onChangeText={(text_user) => actualizarMail(text_user)}
          value={email}
        ></TextInput>

        <TouchableOpacity
          style={[
            styles.ingresar_style,
            { backgroundColor: email ? "#017185" : "rgba(0, 0, 0, 0.15)" },
          ]}
          onPress={() => {}}
          disabled={!email}
        >
          <Text style={styles.ingresar_text}>SOLICITAR</Text>
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
