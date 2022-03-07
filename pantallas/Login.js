import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ImageBackground,
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


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Login({ route }) {
  return (
    <ImageBackground
                source={require('../assets/fondo_login.jpg')}
                style={{width:"100%",height:"100%"}}
            >
    <View style={styles.container}>
      <Image
        style={styles.imagen_style}
        resizeMode="contain"
        source={require("../assets/ESPACIO-TECNO-LOGIN.png")}
      />

      {/* <View style={styles.logo_container}>
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
      </View> */}

      <TextInput
        style={styles.input_style}
        textAlign={'center'}
        placeholderTextColor="#000" 
        placeholder={"Usuario (DNI)"}
      ></TextInput>

      <TextInput
        style={styles.input_style}
        textAlign={'center'}
        placeholderTextColor="#000" 
        placeholder={"Contraseña"}
      ></TextInput>

<TouchableOpacity style={styles.ingresar_style}>
        <Text style={styles.ingresar_text}>INGRESAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{color: 'white', marginTop: 4}}>
        <Text style={styles.recuperar_text}>¿Olvido tu contraseña?</Text>
      </TouchableOpacity>
    </View>
    
    <View style={{
    bottom: 41}}>


      <TouchableOpacity style={{color: 'white'}}>
        <Text style={styles.recuperar_text}>¿No tienes un usuario? <Text style={{fontWeight: 'bold'}}>Registrate</Text></Text>
      </TouchableOpacity>
</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    alignItems: 'center'
  },
  imagen_style: {
    alignSelf: "center",
    marginTop:90,
    marginBottom:80,
    width: 150,
    height: 150,
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
    borderRadius: 30,
    borderColor: "#90C641",
    width: width/1.25,
    padding: 10,
    backgroundColor: "white"
  },
  ingresar_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal:48,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    alignSelf: "center",
  },
  registrarse_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal:48,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    alignSelf: "center"
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
    color: 'white',
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
