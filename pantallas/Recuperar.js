import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { ModalDetallesCurso } from "../modals/ModalDetallesCurso";
import { BASE_URL } from "../api";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Recuperar() {
  const [tokenModal, setTokenModal] = useState(false);

  const [email, setEmail] = useState("");

  const navigation = useNavigation();
  const formData = {};

  const actualizarMail = (text_user) => {
    setEmail(text_user);
  };

  const enviarRegistro = async () => {
    formData.email = email;

    axios({
      url: BASE_URL + "forgotpassword/",

      method: "POST",

      data: formData,
    }).then((result) => {
      if (result.status === 200) {
        navigation.navigate("LoginNavegacion", {screen: 'PantallaToken'})
      }
    });
  };

  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
          Para recibir tu código de acceso, ingrese la dirección de mail
          proporcionado en el registro.
        </Text>

        <TextInput
          style={styles.input_style}
          textAlign={"center"}
          placeholderTextColor="#000"
          keyboardType="email-address"
          placeholder={"Ingrese su email"}
          onChangeText={(text_user) => actualizarMail(text_user)}
          onBlur={() => {
            if (!validateEmail(email)) 
              Alert.alert("Mail inválido. Intentalo nuevamente.")
          }}
          value={email}
        ></TextInput>

        <TouchableOpacity
          style={[
            styles.ingresar_style,
            { backgroundColor: email ? "#017185" : "rgba(0, 0, 0, 0.15)" },
          ]}
          onPress={() => enviarRegistro()}
          disabled={!email}
        >
          <Text style={styles.ingresar_text}>SOLICITAR CÓDIGO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.ingresar_style,
            { backgroundColor: "rgba(0, 0, 0, 0.15)", marginVertical:10 },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.ingresar_text}>VOLVER</Text>
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
    fontSize: width/20,
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
    fontSize: width/20,
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
