import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import Curso from "../componentes/curso";
import { useNavigation } from "@react-navigation/native";

export default function Perfil({}) {
  const [date, setDate] = useState(new Date(1598051730000));

  const [mode, setMode] = useState("date");

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date());

  const [textCumpleanios, setTextCumpleanios] = useState("");

  const navigation = useNavigation();

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

  const perfilData = {
    nombre: "Prueba",
    apellido: "Test",
    documento: "111111111",
    avatar: require("../assets/image1.png"),
    cumpleanios: "30/03/2001",
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="edit" size={24} />
        <Text style={styles.title_perfil}> Editar Perfil </Text>
        <FontAwesome name="edit" size={24} />
      </View>
      <View style={styles.container_nya}>
        <TextInput
          placeholder="Nombre"
          style={styles.data_input}
          multiline={true}
        ></TextInput>
        <TextInput
          placeholder="Apellido"
          style={styles.data_input}
          multiline={true}
        ></TextInput>
      </View>
      <View>
        <TextInput
          placeholder="Documento"
          style={styles.data_input}
          multiline={false}
        ></TextInput>
        <TextInput
          placeholder="Cumpleaños"
          style={styles.data_input}
          multiline={false}
          onPressIn={showMode}
          value={textCumpleanios}
        ></TextInput>
      </View>

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
  },
  container_nya: {
    flexDirection: "row",
  },
  data_input: {
    alignSelf: "stretch",
    marginLeft: 50,
    borderBottomColor: "#000",
    margin: 5,
    marginRight: 50,
    borderBottomWidth: 2,
    width: 100,
    // backgroundColor: '#000',
  },
});
