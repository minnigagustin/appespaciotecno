import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { ModalCambiosConfirmados } from "../componentes/ModalCambiosConfirmados";
import { ScrollView } from "react-native-gesture-handler";

export default function Perfil({ route }) {
  const [date, setDate] = useState(new Date(1598051730000));

  //---------------------------------------------------
  // Propiedades del perfil que se recibe por parámetro.
  //---------------------------------------------------

  const { param_nombre } = route.params;

  const { param_apellido } = route.params;

  const { param_dni } = route.params;

  const { param_cumple } = route.params;

  const { param_avatar } = route.params;

  //---------------------------------------------------
  // Props encargadas del DateTimePicker.
  //---------------------------------------------------

  const [mode, setMode] = useState("date");

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date());

  const [textCumpleanios, setTextCumpleanios] = useState("");

  //---------------------------------------------------
  // Prop para navegar entre Screens.
  //---------------------------------------------------

  const navigation = useNavigation();

  //---------------------------------------------------
  // State que se encarga de mostrar el modal de cambios guardados.
  //---------------------------------------------------

  const [showCambiosModal, setShowCambiosModal] = useState(false);

  //---------------------------------------------------
  // States encargados de actualizar la info del perfil.
  // Por defecto, vienen cargados desde los parámetros del perfil
  //---------------------------------------------------

  const [stateNombre, setStateNombre] = useState(JSON.stringify(param_nombre));

  const [stateApellido, setStateApellido] = useState(
    JSON.stringify(param_apellido)
  );

  const [stateDni, setStateDni] = useState(JSON.stringify(param_dni));

  const [stateCumpleanios, setStateCumpleanios] = useState(param_cumple);

  const [stateAvatar, setStateAvatar] = useState(param_avatar);

  //---------------------------------------------------
  // Nuevo perfil con las modificacioes realizadas
  //---------------------------------------------------

  const perfilModificado = {
    nuevo_nombre: "",
    nuevo_apellido: "",
    nuevo_dni: "",
    nuevo_avatar: "",
    nuevo_cumple: "",
  };

  //---------------------------------------------------
  // Función que actualiza la fecha de cumpleaños
  //---------------------------------------------------

  const onChange = (event, selectedDate) => {
    if (selectedDate != null) {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios");
      setDate(currentDate);
      setDateInput(selectedDate);
      setTextCumpleanios(
        dateInput.getDate() +
          "/" +
          dateInput.getMonth() +
          "/" +
          dateInput.getUTCFullYear()
      );
      actualizarCumple(textCumpleanios)
    } else {
      setTextCumpleanios(" / / ");
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const setTextInput = () => {
    showMode();
  };

  const guardarCambios = () => {
    if (perfilModificado.nuevo_nombre != "")
      setStateNombre(perfilModificado.nuevo_nombre);
    if (perfilModificado.nuevo_apellido != "")
      setStateApellido(perfilModificado.nuevo_apellido);
    if (perfilModificado.nuevo_dni != "")
      setStateDni(perfilModificado.nuevo_dni);
    if (perfilModificado.nuevo_cumple != "")
      setStateCumpleanios(perfilModificado.nuevo_cumple);
  };

  const restoreCambiosModal = () => {
    setShowCambiosModal(false);
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

  const actualizarCumple = (text) => {
    console.log("Entre")
    perfilModificado.nuevo_cumple = text;
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
            <Image source={stateAvatar} />
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
              <FontAwesome name="birthday-cake" size={20} /> {stateCumpleanios}
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

          <TextInput
            name="text_cumple"
            placeholder={"Cumpleaños"}
            placeholderTextColor="#777"
            style={styles.data_input}
            multiline={false}
            onChange={onChange
            }
            onPressIn={showMode}
            value={textCumpleanios}
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      {showCambiosModal && (
        <ModalCambiosConfirmados
          state={showCambiosModal}
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
