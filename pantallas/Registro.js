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
  Animated,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";

import React from "react";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";


import { BaseRouter, useNavigation } from "@react-navigation/native";

import { useState, useEffect } from "react";
import { Entypo } from "react-native-vector-icons"

import axios from "axios";


import { BASE_URL, axiosLoggedOutConfig, axiosLoggedInConfig } from "../api";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function Registro() {
  const [nombre, setNombre] = useState("");

  const [apellido, setApellido] = useState("");

  const [dni, setDni] = useState("");

  const [email, setEmail] = useState("");

  const [localidad, setLocalidad] = useState("");

  const [genero, setGenero] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [escanea, setEscanea] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [nivel, setNivel] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);

  const [contrasenia, setContrasenia] = useState("");

  const [loading, setLoading] = useState(false);

  const [modalOk, setModalOk] = useState(false);
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(
    new Animated.Value(0),
  )

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

    if (checkCampos()) {
      enviarRegistro();

    } else Alert.alert("Ey! No pudimos registrarte", 'Asegurate de completar todos los campos');
  };

  const checkCampos = () => {
    if (
      nombre !== "" &&
      apellido !== "" &&
      dni !== "" &&
      localidad !== "" &&
      genero !== 0 &&
      contrasenia !== ""
    )
      return true;
    else return false;
  };

  const enviarRegistro = async () => {
    const formDoc = {};
    formDoc.numero_documento = dni;
    formDoc.password = contrasenia;
    formDoc.email = email;
    formDoc.nombre = nombre;
    formDoc.apellido = apellido;
    formDoc.registrado_desde = 2;
    formDoc.tipo = 1;
    console.log(formDoc);
    axiosLoggedOutConfig.post( BASE_URL + "user/", formDoc).then((result) => {
      if (result.status === 201) {
        axiosLoggedOutConfig.post( BASE_URL + "login/", formDoc)
          .then((response) => {
            if (response.status === 200) {
              AsyncStorage.setItem("perfil", JSON.stringify(response.data));
              AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);

              navigation.replace("HomeInicio");

              console.log(global.authenticated)
            }
          })

          .catch(function (prueba) {
            // handle error
              console.log(prueba);
            setLoading(false);

          });
      }
    }).catch(function (prueba) {
      setLoading(false);
      console.log(prueba);
      Alert.alert('Error', 'Este usuario ya tiene una cuenta aqui.')
    }

    );
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

    setGenero(0);

    setContrasenia("");
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    animateLine();
  }, []);

  const animateLine = () => {
    Animated.sequence([
      Animated.timing(focusLineAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }), Animated.timing(focusLineAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(animateLine)
  }

  const handleBarCodeScanned = ({ data }) => {
    setDni(data.split('@')[4]);
    setApellido(data.split('@')[1]);
    setNombre(data.split('@')[2].split(' ')[0]);
    setGenero(data.split('@')[3] === 'M' ? 1 : 2);
    setModalVisible(false);
  };


  return (
    <ImageBackground
      source={require("../assets/fondo_login.webp")}
      style={{ resizeMode: "stretch", width: width, height: height+30 }}
    ><KeyboardAvoidingView behavior="position" keyboardVerticalOffset={15} enabled>
        <ScrollView>
          <View>
        
        <Modal
          animationType="slide"
          visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Login cancelado", "No ingresaste tu DNI");
          setModalVisible(!modalVisible);
        }}
        ><ImageBackground
          source={require("../assets/fondo_login.webp")}
          style={{ resizeMode: "stretch", width: width, height: height + 30 }}
        >
            <View style={styles.centeredView}>
              <Text style={{
                color: "white",
                fontSize: width / 20,
                marginBottom: 20,
                textAlign: "center",
                fontFamily: "Roboto",
              }}>Escanea tu <Text style={{ fontWeight: 'bold', color: 'white' }}>DNI</Text></Text>
              <View style={[styles.modalView, {
                backgroundColor: escanea ? "white" : null,
              }]}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  barCodeTypes={[
                    BarCodeScanner.Constants.BarCodeType.pdf417
                  ]}
                  style={{ width: 1000, height: 1000 }}
                />
                <View style={styles.overlay}>
                  <View style={styles.unfocusedContainer}></View>
                  <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View><View
                      onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
                      style={styles.focusedContainer}>
                      {!scanned && (
                        <Animated.View
                          style={[
                            styles.animationLineStyle,
                            {
                              transform: [
                                {
                                  translateY: focusLineAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, animationLineHeight],
                                  }),
                                },
                              ],
                            },
                          ]}
                        />
                      )}
                    </View><View style={styles.unfocusedContainer}></View></View><View style={styles.unfocusedContainer}></View></View>

              </View>
            </View>
            <View style={{ position: 'absolute',
            top: '10%', width: width, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{
                color: "white",
                fontSize: width * 0.05,
                textAlign: "center",
                justifyContent: 'center',
                fontFamily: "Roboto",
              }}>Escanea tu <Text style={{ fontWeight: 'bold', color: 'white' }}>DNI</Text></Text>
            </View>
            <View style={{ position: 'absolute',
            bottom: '10%', width: width, justifyContent: 'center', alignItems: 'center'}}>
               <Text style={{
                color: "white",
                fontSize: width * 0.04,
                textAlign: "center",
                justifyContent: 'center',
                fontFamily: "Roboto",
              }}>Apunta la camara al <Text style={{ fontWeight: 'bold', color: 'white' }}>QR</Text> en tu documento</Text>
            </View>
          </ImageBackground>
        </Modal>
        
        
          <Image
            style={styles.imagen_style}
            resizeMode="contain"
            source={require("../assets/ESPACIO-TECNO-LOGIN.webp")}
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
    fontFamily: "Roboto",}}><Entypo name={'credit-card'} size={16} color="white" /> Escanea tu <Text style={{fontWeight: 'bold', color: 'white'}}>DNI</Text></Text></TouchableOpacity>
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
                  setGenero(1);
                }}
                style={{backgroundColor: genero === 1 ? "#055c6e" : 'white', padding: genero === 1 ? 11: 8, margin: genero === 1 ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === 1 ? 'white' : 'black'}}> Masculino </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setGenero(2);
                }}
                backgroundColor="#ffff"
                style={{backgroundColor: genero === 2 ? "#055c6e" : 'white', padding: genero === 2 ? 11 : 8, margin: genero === 2 ? 0 : 3}}
              >
                <Text style={{fontSize: width/20, color: genero === 2 ? 'white' : 'black'}}> Femenino </Text>
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
            </View>
        </ScrollView>
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      </KeyboardAvoidingView>
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
    fontSize: width / 22,
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
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }, unfocusedContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', }, middleContainer: { flexDirection: 'row', flex: 0.5, }, focusedContainer: { flex: 6, }, animationLineStyle: {
    height: 4, width: '100%', backgroundColor: 'red',
    elevation:20,
    color: 'red'
  }, rescanIconContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', },
});
