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
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  Pressable,
  TextInput,
  Animated
} from "react-native";
import { Entypo } from "react-native-vector-icons"
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as Facebook from 'expo-facebook';

import axios from "axios";

import { BASE_URL, axiosLoggedOutConfig } from "../api";

import global from "../componentes/global";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;


const height = Dimensions.get("window").height;


const formData = {};


export default function Login({ }) {
  const [dni, setDni] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [facebook, setFacebook] = useState({});
  const [scanned, setScanned] = useState(false);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [escanea, setEscanea] = useState(false);
  const [modalDocumento, setModalDocumento] = useState(false);

  const [contrasenia, setContrasenia] = useState("");

  const [usuario, setUsuario] = useState("");

  const navigation = useNavigation();
  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(
    new Animated.Value(0),
  )


  const actualizarUser = (text_user) => {
    setDni(text_user);
  };

  const actualizarContra = (text_contra) => {
    setContrasenia(text_contra);
  };

  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Hubo un error con el token de notificaciones!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Estas usando un emulador, no son validas las notificaciones');
      return;
    }
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '587909999636433',
      });
      const { type, token, expirationDate, permissions, declinedPermissions } =
        await Facebook.logInWithReadPermissionsAsync({
          permissions: ['public_profile', 'email'],
        });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture.type(large),birthday`);
        const data = await response.json();
        // Alert.alert('Usted esta logueado!', 'Bienvenido ' + data.name + ' su email es ' + data.email);
        console.log(data);
        console.log(data.name.split(' ')[0]);
        console.log(data.name.split(' ').slice(1).join(' '));
        console.log(data.picture.data.url);
        actualizarContra(data.id);
        setLoading(true);
        const formFace = {};
        const url_logout = BASE_URL + "logout/";
        const url_login = BASE_URL + "login/";
        console.log(url_login);
        formFace.numero_documento = '';
        formFace.password = data.id;
        formFace.email = data.email ? data.email : data.id + '@facebook.com';
        formFace.picture_facebook = data.picture.data.url;
        formFace.numero_documento = null;
        formFace.nombre = data.name.split(' ')[0];
        formFace.apellido = data.name.split(' ').slice(1).join(' ');
        formFace.registrado_desde = 1;
        formFace.tipo = 2;
        formFace.token_push = expoPushToken ? expoPushToken: null;
        console.log(formFace);
        setFacebook(formFace);
        console.log('HASTA ACA LLEGA')
        axiosLoggedOutConfig.post(url_login, formFace)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              global.authenticated = true;
              console.log(global.authenticated);
              setLoading(false);
              console.log(response.data);
              AsyncStorage.setItem("perfil", JSON.stringify(response.data));
              AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);

              navigation.replace("HomeInicio");

              console.log(global.authenticated)
            }
          })

          .catch(function () {
            // handle error

            setLoading(false);
            setModalVisible(true);

          });

      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

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
      }
    });
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


  const verificarUsuario = async () => {
    const formData = {};
    const url_logout = BASE_URL + "logout/";
    const url_login = BASE_URL + "login/";
    console.log(url_login);
    formData.numero_documento = dni;
    formData.password = contrasenia;
    formData.email = '';
    formData.token_push = expoPushToken ? expoPushToken: null;
    console.log(formData);
    axiosLoggedOutConfig.post(url_login, formData)
      .then((response) => {
        if (response.status === 200) {
          global.authenticated = true;
          console.log(response.data);
          console.log(global.authenticated);
          setLoading(false);
          AsyncStorage.setItem("perfil", JSON.stringify(response.data));
          AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);

          navigation.replace("HomeInicio");

          console.log(global.authenticated)
        }
      })

      .catch(function (error) {
        // handle error
        console.log(error)
        Alert.alert("ALERTA!", "DNI O CONTRASEÑA INCORRECTA");

        setLoading(false);
      });
  };

  const resetearCampos = () => {
    setDni("");
    setContrasenia("");
  };


  const handleBarCodeScanned = ({ data }) => {
    enviarRegistro(data.split('@')[4], moment(data.split('@')[6], "DD/MM/YYYY").format("YYYY-MM-DD"));
    setModalVisible(false);
  };

  const handleBarDocumentoScanned = ({ data }) => {
    if(data.split('@')[4]) {
    setModalDocumento(false);
    setLoading(true);
    loginDocumento(data);
  } else {
    setModalDocumento(false);
    Alert.alert('Error', 'No es un documento valido.')
  }
  };
  const loginDocumento = async (data) => {
    const formDoc = {};
    const url_logout = BASE_URL + "logout/";
    const url_login = BASE_URL + "login/";
    const nombre = data.split('@')[2].toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
    const apellido = data.split('@')[1].toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
    console.log(url_login);
    formDoc.numero_documento = data.split('@')[4];
    formDoc.password = data.split('@')[0];
    formDoc.genero_persona = data.split('@')[3] === 'M' ? 1 : 2;
    formDoc.fecha_nacimiento = moment(data.split('@')[6], "DD/MM/YYYY").format("YYYY-MM-DD");
    formDoc.email = null;
    formDoc.nombre = nombre.split(' ')[0];
    formDoc.apellido = apellido;
    formDoc.registrado_desde = 3;
    formDoc.tipo = 2;
    formDoc.token_push = expoPushToken ? expoPushToken: null;

    axiosLoggedOutConfig.post(url_login, formDoc)
      .then((response) => {
        if (response.status === 200) {
          global.authenticated = true;
          console.log(global.authenticated);
          setLoading(false);
          AsyncStorage.setItem("perfil", JSON.stringify(response.data));
          AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);
          navigation.replace("HomeInicio");

          console.log(global.authenticated)
        }
      })

      .catch(function () {
        // handle error

        setLoading(true);
        registraDocumento(formDoc);

      });
  };

  const registraDocumento = async (data) => {
    const dataDoc = data;
    dataDoc.email = dataDoc.numero_documento + '@documento.com';
    dataDoc.email_padre = null;
    const url_login = BASE_URL + "login/";
    console.log(dataDoc);
    axiosLoggedOutConfig.post( BASE_URL + "user/", dataDoc).then((result) => {
      if (result.status === 201) {
        dataDoc.email = null;
        axiosLoggedOutConfig.post( BASE_URL + "login/", dataDoc)
          .then((response) => {
            if (response.status === 200) {
              global.authenticated = true;
              console.log(global.authenticated);
              setLoading(false);
              AsyncStorage.setItem("perfil", JSON.stringify(response.data));
              AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);

              navigation.replace("HomeInicio");

              console.log(global.authenticated)
            }
          })

          .catch(function () {
            // handle error

            setLoading(false);
            Alert.alert('ocurrio un error', 'Esta cuenta ya esta siendo utilizada')

          });
      }
    }).catch(function (err) {
      setLoading(false);
      console.log(err)
      Alert.alert('Error', 'Este usuario ya tiene una cuenta aqui.')
    }

    );
  };

  const enviarRegistro = async (numerito, nacimiento) => {
    const facebookform = facebook;
    const url_login = BASE_URL + "login/";
    facebookform.numero_documento = numerito ? numerito : dni;
    facebookform.fecha_nacimiento = nacimiento;
    facebookform.email_padre = null;
    console.log(facebookform);
    axiosLoggedOutConfig.post( BASE_URL + "user/", facebookform).then((result) => {
      if (result.status === 201) {
        axiosLoggedOutConfig.post( BASE_URL + "login/", facebook)
          .then((response) => {
            if (response.status === 200) {
              global.authenticated = true;
              console.log(global.authenticated);
              setLoading(false);
              AsyncStorage.setItem("perfil", JSON.stringify(response.data));
              AsyncStorage.setItem("lgac", response.data.access);
              AsyncStorage.setItem("lgrf", response.data.refresh);

              navigation.replace("HomeInicio");

              console.log(global.authenticated)
            }
          })

          .catch(function () {
            // handle error

            setLoading(false);
            setModalVisible(true);

          });
      }
    }).catch(function () {
      setLoading(false);
      Alert.alert('Error', 'Este usuario ya tiene una cuenta aqui.')
    }

    );
  };

  const abrirDocumento = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setModalDocumento(status=== 'granted');
      if (status !== 'granted') {
        Alert.alert('Error', 'Rechazaste el permiso de camara.');
      }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo_login.webp")}
      style={{ resizeMode: "stretch", width: width, height: height + 30 }}
    >
      <View style={styles.container}>
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
              <View style={[styles.modalView, {
                backgroundColor: escanea ? "white" : null,
              }]}>
                {escanea ? (<BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  barCodeTypes={[
                    BarCodeScanner.Constants.BarCodeType.pdf417
                  ]}
                  style={{ height: width * 0.80, width: width * 0.65 }}
                />) : (<TextInput
                  style={styles.input_style}
                  textAlign={"center"}
                  placeholderTextColor="#000"
                  keyboardType="numeric"
                  placeholder={"Ingresa tu DNI manualmente"}
                  onChangeText={(text_user) => actualizarUser(text_user)}
                  value={dni}
                ></TextInput>)}

              </View>
              <TouchableOpacity onPress={() => setEscanea(!escanea)} style={{
                borderRadius: 30,
                borderColor: "black",
                marginTop: 10,
                paddingVertical: 6,
                paddingHorizontal: 48,
                backgroundColor: "white",
                alignSelf: "center",
              }}><Text style={{
                fontSize: width / 22,
                color: "#017185",
                marginVertical: 7,
                marginHorizontal: 7,
              }}>{escanea ? 'Manualmente' : 'Escanea'}</Text></TouchableOpacity>

              <TouchableOpacity onPress={() => { setModalVisible(false), enviarRegistro() }} style={{
                borderRadius: 30,
                borderColor: "black",
                marginTop: 10,
                paddingVertical: 6,
                paddingHorizontal: 48,
                backgroundColor: dni ? "#017185" : "rgba(0, 0, 0, 0.15)",
                alignSelf: "center",
              }} disabled={!dni}><Text style={{
                fontSize: width / 22,
                color: "white",
                marginVertical: 7,
                marginHorizontal: 7,
              }}>Iniciar</Text></TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>

        <Modal
          animationType="slide"
          visible={modalDocumento}
          onRequestClose={() => {
            Alert.alert("Login cancelado", "No escaneaste tu DNI");
            setModalDocumento(!modalDocumento);
          }}
        >
          <ImageBackground
          source={require("../assets/fondo_login.webp")}
          style={{ resizeMode: "stretch", width: width, height: height + 30 }}
        >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, {
                backgroundColor: escanea ? "white" : null,
              }]}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarDocumentoScanned}
                  barCodeTypes={[
                    BarCodeScanner.Constants.BarCodeType.pdf417
                  ]}
                  style={{ width: 1000, height: 1000 }}
                />
                <View style={styles.overlay}>
                 {/* <Text style={{
                color: "white",
                fontSize: width / 20,
                marginBottom: 20,
                textAlign: "center",
                fontFamily: "Roboto",
                position: "absolute"
              }}>Escanea tu <Text style={{ fontWeight: 'bold', color: 'white' }}>DNI</Text></Text> */}
                  <View style={styles.unfocusedContainer}></View>
                  <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View><View
                      onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
                      style={styles.focusedContainer}><Text style={{
                color: "white",
                fontSize: width / 20,
                textAlign: "center",
                top: 15,
                justifyContent: 'center',
                elevation: 3, position: 'absolute',
                fontFamily: "Roboto",
              }}>Escanea tu <Text style={{ fontWeight: 'bold', color: 'white' }}>DNI</Text></Text>
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
              <Image
            style={{width: width * 0.6, height: width * 0.3, marginTop: 8}}
            source={require("../assets/documentovector.webp")}
          />
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
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={15} enabled>

          <Image
            style={styles.imagen_style}
            resizeMode="contain"
            source={require("../assets/ESPACIO-TECNO-LOGIN.webp")}
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
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#FFFFFF"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          ) : (
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
          )}

          <TouchableOpacity
            style={{ color: "white" }}
            onPress={() => navigation.navigate("Recuperar")}
          >
            <Text style={styles.recuperar_text}>¿Olvidó su contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#4267b2',
            paddingVertical: 10,
            paddingHorizontal: 10, marginTop: scale(20),
            borderRadius: 20, alignItems: 'center'
          }} onPress={logIn}>
            <Text style={{ color: "#fff", fontSize: width / 28 }}><Entypo name={'facebook'} size={16} color="white" /> Inicia sesion con <Text style={{ fontWeight: 'bold' }}>Facebook</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#4267b2',
            paddingVertical: 10,
            paddingHorizontal: 10, marginTop: 10,
            borderRadius: 20, alignItems: 'center'
          }} onPress={() => abrirDocumento()}>
            <Text style={{ color: "#fff", fontSize: width / 28 }}><Entypo name={'credit-card'} size={16} color="white" /> Inicia sesion con tu <Text style={{ fontWeight: 'bold' }}>Documento</Text></Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
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
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
  },
  imagen_style: {
    alignSelf: "center",
    marginTop: hp(8),
    marginBottom: hp(8),
    width: wp(34),
    height: wp(34),
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
    fontSize: width / 22,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "#90C641",
    width: width / 1.25,
    padding: hp(1.4),
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
    fontSize: width / 22,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
  },
  recuperar_text: {
    color: "white",
    fontSize: width / 26,
    marginTop: 10,
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
