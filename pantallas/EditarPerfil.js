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

export default function Perfil({}) {
  const [date, setDate] = useState(new Date(1598051730000));

  const [mode, setMode] = useState("date");

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date());

  const [textCumpleanios, setTextCumpleanios] = useState("");

  const navigation = useNavigation();

  const [showCambiosModal, setShowCambiosModal] = useState(false);

  const [nombres, setNombres] = useState("");

  const [apellido, setApellido] = useState("");

  const [dni, setDni] = useState(1);

  const [cumpleanios, setCumpleanios] = useState("/ /");

  const perfilData = {
    nombre: nombres,
    apellido: apellido,
    documento: dni,
    cumpleanios: cumpleanios,
  };

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

  const guardarCambios = (nombre) => {
    if(nombre != null)
      {setNombres(nombre);
      console.log(nombres)}
  };

  const checkEvent = (event, nombre) => {
    setNombres(event);
  };

  const restoreCambiosModal = () => {
    setShowCambiosModal(false);
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
            <Image source={perfilData.avatar} />
          </View>
          <View>
            <Text style={styles.info_header}>
              <FontAwesome name="user-circle-o" size={20} marginRight={55} />{" "}
              {perfilData.nombre} {perfilData.apellido}
            </Text>
            <Text style={styles.info_header}>
              <FontAwesome name="vcard" size={20} /> {perfilData.documento}
            </Text>
            <Text style={styles.info_header}>
              <FontAwesome name="birthday-cake" size={20} />{" "}
              {perfilData.cumpleanios}
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            id="nombre"
            placeholder={perfilData.nombre}
            style={styles.data_input}
            autoCorrect={false}
            blurOnSubmit
            placeholderTextColor="#777"
            autoCapitalized="words"
            multiline={true}
            onChangeText={}
          ></TextInput>

          <TextInput
            name="apellido"
            placeholder={perfilData.apellido}
            style={styles.data_input}
            multiline={true}
            onChangeText={(value) => this.setApellido({ apellido: value })}
          ></TextInput>

          <TextInput
            name="documento"
            placeholder={perfilData.documento}
            style={styles.data_input}
            keyboardType="numeric"
            maxLength={10}
            multiline={false}
            onChangeText={(value) => this.setDni({ dni: value })}
          ></TextInput>

          <TextInput
            name="cumpleanios"
            placeholder={perfilData.cumpleanios}
            style={styles.data_input}
            multiline={false}
            onChangeText={(value) =>
              this.setCumpleanios({ cumpleanios: value })
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
