import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { FontAwesome } from "react-native-vector-icons";

import React, { useState, useCallback } from "react";

import { useNavigation } from "@react-navigation/native";

import { ModalCambiosConfirmados } from "../modals/ModalCambiosConfirmados";

import { ModalConfirmarCambios } from "../modals/ModalConfirmarCambios";

import { ScrollView } from "react-native-gesture-handler";

import * as ImagePicker from "expo-image-picker";

import { BASE_URL } from "../api";

export default function Perfil({ route }) {
  //---------------------------------------------------
  // Propiedades del perfil que se recibe por parámetro.
  //---------------------------------------------------

  const { param_nombre } = route.params;

  const { param_apellido } = route.params;

  const { param_dni } = route.params;

  const { param_cumple } = route.params;

  const { param_avatar } = route.params;

  const [mode, setMode] = useState("date");

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date());

  const [textCumpleanios, setTextCumpleanios] = useState("");

  const navigation = useNavigation();

  const [showCambiosRealizadosModal, setShowCambiosRealizadosModal] =
    useState(false);

  const [showAConfirmarModal, setShowAConfirmarModal] = useState(false);

  const [stateNombre, setStateNombre] = useState(
    JSON.stringify(param_nombre).replace(/['"]+/g, "").trim()
  );

  const [stateApellido, setStateApellido] = useState(
    JSON.stringify(param_apellido).replace(/['"]+/g, "").trim()
  );

  const [stateDni, setStateDni] = useState(
    JSON.stringify(param_dni).replace(/['"]+/g, "").trim()
  );

  const userCumpleanios = param_cumple;

  const [stateAvatar, setStateAvatar] = useState(param_avatar);

  const perfilModificado = {
    nuevo_nombre: stateNombre,

    nuevo_apellido: stateApellido,

    nuevo_dni: stateDni,

    nuevo_avatar: stateAvatar,
  };

  const guardarPerfil = () => {

    setStateNombre(perfilModificado.nuevo_nombre);

    setStateApellido(perfilModificado.nuevo_apellido);

    setStateAvatar(perfilModificado.nuevo_avatar);

    setStateDni(perfilModificado.nuevo_dni);

    setStateAvatar(perfilModificado.nuevo_avatar);
  };

  const guardarCambios = () => {

    checkCambios();
  };

  const checkCambios = () => {

    if (
      perfilModificado.nuevo_nombre !== stateNombre ||

      perfilModificado.nuevo_apellido !== stateApellido ||

      perfilModificado.nuevo_dni !== stateDni

    )
      setShowAConfirmarModal(true);
  };

  const restoreCambiosModal = () => {

    setShowCambiosRealizadosModal(false);

    setShowAConfirmarModal(false);

  };

  const actualizarNombre = (text) => {

    perfilModificado.nuevo_nombre = text;

  };

  const actualizarApellido = (text) => {

    perfilModificado.nuevo_apellido = text;

  };

  const actualizarDni = (text) => {

    perfilModificado.nuevo_dni = text;

  };

  const [image, setImage] = useState(null);

  const actualizarAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setStateAvatar(image);
      //setStateAvatar(result.uri)
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <FontAwesome name="edit" size={24} />
          <Text style={styles.title_perfil}> Editar Perfil </Text>
          <FontAwesome name="edit" size={24} />
        </View>
        <View style={styles.container_header}>
          <View style={styles.header_info_container}>
            <TouchableOpacity onPress={actualizarAvatar}>
              <Image
                source={{ uri: BASE_URL + stateAvatar }}
                style={{ width: 150, height: 150, borderRadius: 400 / 2 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.info_header}>
              <FontAwesome name="user-circle-o" size={20} marginRight={55} />{" "}
              {stateNombre} {stateApellido}
            </Text>
            <Text style={styles.info_header}>
              <FontAwesome name="vcard" size={20} /> {stateDni}
            </Text>
            <Text style={styles.info_header}>
              <FontAwesome name="birthday-cake" size={20} /> {userCumpleanios}
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            id="text_nombre"
            placeholder={"Nombre"}
            style={styles.data_input}
            autoCorrect={false}
            blurOnSubmit
            placeholderTextColor="#777"
            autoCapitalized="words"
            multiline={true}
            onChangeText={(text_nombre) => actualizarNombre(text_nombre)}
          ></TextInput>

          <TextInput
            id="text_apellido"
            placeholder={"Apellido"}
            placeholderTextColor="#777"
            style={styles.data_input}
            autoCorrect={false}
            blurOnSubmit
            autoCapitalize="words"
            multiline={true}
            onChangeText={(text_apellido) => actualizarApellido(text_apellido)}
          ></TextInput>

          <TextInput
            name="text_dni"
            placeholder={"Documento"}
            placeholderTextColor="#777"
            style={styles.data_input}
            keyboardType="numeric"
            blurOnSubmit
            maxLength={10}
            multiline={false}
            onChangeText={(text_dni) => actualizarDni(text_dni)}
          ></TextInput>
        </View>

        <View style={styles.buttons_container_in_row}>
          <TouchableOpacity
            style={styles.cancelar_style}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.button_text}> Cancelar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.guardar_style}
            onPress={() => {
              guardarCambios();
            }}
          >
            <Text style={styles.button_text}> Guardar </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showAConfirmarModal && (
        <ModalConfirmarCambios
          state={showAConfirmarModal}
          restore={restoreCambiosModal}
          init={guardarPerfil}
        />
      )}

      {showCambiosRealizadosModal && (
        <ModalCambiosConfirmados
          state={showCambiosRealizadosModal}
          restore={restoreCambiosModal}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  edit_icon: {
    alignItems: "flex-end",
    paddingRight: 50,
  },
  title_perfil: {
    textAlign: "center",
    fontSize: 24,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
  },
  data_input: {
    alignSelf: "stretch",
    marginLeft: 50,
    borderBottomColor: "#000",
    margin: 5,
    marginRight: 50,
    marginVertical: 15,
    borderBottomWidth: 2,
    // backgroundColor: '#000',
  },
  info_header: {
    fontSize: 20,
    alignItems: "center",
    marginLeft: 40,
    marginTop: 10,
  },
  avatar_picker: {
    marginRight: 10,
    alignSelf: "flex-end",
  },
  container_header: {
    backgroundColor: "#90C641",
    textAlign: "center",
    flexDirection: "row",
    borderRadius: 15,
    marginHorizontal: 15,
  },
  buttons_container_in_row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  cancelar_style: {
    borderRadius: 12,
    backgroundColor: "#FA0000",
    marginRight: 100,
  },
  guardar_style: {
    borderRadius: 10,
    backgroundColor: "#4D94C1",
  },
  button_text: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    width: 120,
    textAlign: "center",
  },
});
