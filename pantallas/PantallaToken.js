import {
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function PantallaToken({}) {
  const [token, setToken] = useState("");

  const [apiToken, setApiToken] = useState("prueba123");

  const [modalCambioPsw, setModalCambioPsw] = useState(false);

  const navigation = useNavigation();

  const actualizarToken = (text_user) => {
    setToken(text_user);
  };

  const verificarToken = () => {
    if (token === apiToken) setModalCambioPsw(true);
    else Alert.alert("Código incorrecto");
  };

  const restore = () => {
    setModalCambioPsw(false);
  };

  return (
    <ImageBackground
      source={require("../assets/fondo_login.webp")}
      style={{ resizeMode: "stretch", width: width, height: height }}
    >
      <View style={styles.container}>
        <Image
          style={styles.imagen_style}
          resizeMode="contain"
          source={require("../assets/ESPACIO-TECNO-LOGIN.webp")}
        />

        <Text
          style={{
            paddingHorizontal: 15,
            textAlign: "center",
            fontSize: width / 18,
            fontWeight: "900",
            color: "#FFF",
            marginBottom: 30,
          }}
        >
          {" "}
          Ingrese el código enviado a su correo electrónico.
        </Text>

        <TextInput
          style={styles.input_style}
          textAlign={"center"}
          placeholderTextColor="#000"
          keyboardType="email-address"
          placeholder={"Ingrese el código"}
          onChangeText={(text_user) => actualizarToken(text_user)}
          value={token}
        ></TextInput>

        <TouchableOpacity
          style={[styles.ingresar_style]}
          onPress={() => verificarToken()}
          disabled={!token}
        >
          <Text style={styles.ingresar_text}>VERIFICAR CÓDIGO</Text>
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
