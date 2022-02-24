import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { ModalCambiosConfirmados } from "../componentes/ModalCambiosConfirmados";
import { ModalConfirmarCambios } from "../componentes/ModalConfirmarCambios";
import { ScrollView } from "react-native-gesture-handler";

export default function Login({ route }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imagen_style}
        source={require("../assets/espaciotecno.jpg")}
      />

      <View style={styles.logo_container}>
        <Image
          style={styles.logo_style}
          source={require("../assets/descubrir.jpg")}>
        </Image>

        <Image
          style={styles.logo_style}
          source={require("../assets/emprender.jpg")}>
        </Image>

        <Image
          style={styles.logo_style}
          source={require("../assets/capacitar.jpg")}>
        </Image>
      </View>

      <TextInput
        style={styles.input_style}
        placeholder={"Ingrese un usuario"}
      ></TextInput>

      <TextInput
        style={styles.input_style}
        placeholder={"Ingrese su contraseña"}
      ></TextInput>

      <TouchableOpacity style={styles.ingresar_style}>
        <Text style={styles.ingresar_text}> Ingresar </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.crear_style}>
        <Text style={styles.crear_text}> Crear usuario </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.recuperar_text}> Recuperar Contraseña </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imagen_style: {
    alignSelf: "center",
    marginVertical: 10,
    width: 200,
    height: 200,
  },
  logo_container: {
    flexDirection: "row",
    justifyContent:"center",
    marginTop: -45,
    marginBottom:30
  },
  logo_style: {
    width: 120,
    height: 80,
    margin:3,
    resizeMode : 'contain'
  },
  input_style: {
    alignSelf: "center",
    alignItems: "stretch",
    fontSize: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderRadius: 300 / 40,
    borderColor: "#90C641",
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  ingresar_style: {
    borderRadius: 300 / 40,
    borderColor: "black",
    backgroundColor: "#90C641",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 9,
  },
  ingresar_text: {
    fontSize: 25,
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
    color: "#a8a7a7",
    fontSize: 15,
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
    color: "#a8a7a7",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});
