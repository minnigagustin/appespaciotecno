import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import Curso from "../componentes/curso";

export default function Perfil({}) {
  const [date, setDate] = useState(new Date(1598051730000));

  const [mode, setMode] = useState("date");

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date());

  const [textCumpleanios, setTextCumpleanios] = useState("");

  const [ocultar_cursos_state, set_ocultar_cursos_state] = useState(false);

  const [mensaje_cursos_state, set_mensaje_cursos_state] = useState(
    "Mostrar todos los cursos"
  );

  const [favoritos, setFavoritos] = useState(false);

  const misCursosData = [
    {
      nombre: "Python",
      subtitulo: "de junior a senior",
      fecha: "Del 27/01 al 30/03",
    },
    {
      nombre: "React",
      subtitulo: "Probando",
      fecha: "Del 13/01 al 20/03 - Ultimos días",
    },
    {
      nombre: "Go",
      subtitulo: "de junior a senior",
      fecha: "Del 03/04 al 24/05",
    },
    { nombre: "HTML", subtitulo: "de junior a senior" },
    {
      nombre: "React Native",
      subtitulo: "Probando",
      fecha: "Del 13/01 al 20/03 - Ultimos días",
    },
  ];

  const favoritosData = [
    {
      nombre: "React Native",
      subtitulo: "Probando",
      fecha: "Del 13/01 al 20/03 - Ultimos días",
    },
    {
      nombre: "Python",
      subtitulo: "de junior a senior",
      fecha: "Del 27/01 al 30/03",
    },
    {
      nombre: "Go",
      subtitulo: "de junior a senior",
      fecha: "Del 03/04 al 24/05",
    },
  ];

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

  const cambiarMensajeCursos = () => {
    set_ocultar_cursos_state(!ocultar_cursos_state);
    setFavoritos(false);
    ocultar_cursos_state
      ? set_mensaje_cursos_state("Mostrar todos los cursos")
      : set_mensaje_cursos_state("Ocultar todos los cursos");
  };

  const cambiarFavoritos = () => {
    set_ocultar_cursos_state(false);
    setFavoritos(!favoritos);
  };

  const perfilData = {
    nombre: "Ricardo",
    apellido: "Fort",
    documento: "7777777",
    avatar: require("../assets/image1.png"),
    cumpleanios: "30/03/2001",
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user" size={24} />
        <Text style={styles.title_perfil}>Perfil</Text>
        <FontAwesome name="user" size={24} />
      </View>

      <View>
        <View style={styles.profile_content}>
          <Image source={perfilData.avatar} style={styles.profile_image} />
        </View>

        <View>
          <TouchableOpacity
            style={styles.edit_icon}
            onPress={() => {
              navigation.navigate("EditarPerfil", {
                param_nombre: perfilData.nombre,
                param_apellido: perfilData.apellido,
                param_dni: perfilData.documento,
                param_cumple: perfilData.cumpleanios,
                param_avatar: perfilData.avatar
              });
            }}
          >
            <FontAwesome name="edit" size={24} />
          </TouchableOpacity>
        </View>

        <Text style={styles.text_label}> Nombre y Apellido</Text>

        <Text style={styles.input_text}>{perfilData.nombre}</Text>

        <Text style={styles.text_label}> Documento</Text>

        <Text style={styles.input_text}>{perfilData.documento}</Text>

        <TouchableOpacity onPress={showDatepicker}>
          <Text>Cumpleaños</Text>
        </TouchableOpacity>
        <Text style={styles.input_text}>{perfilData.cumpleanios}</Text>
      </View>

      <View style={styles.container_buttons}>
        <TouchableOpacity
          style={styles.button_mensaje_style}
          onPress={cambiarMensajeCursos}
        >
          <Text style={styles.button_text}>{mensaje_cursos_state}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_favoritos_style}
          onPress={cambiarFavoritos}
        >
          <Text style={styles.button_text}>Favoritos</Text>
        </TouchableOpacity>
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

      {ocultar_cursos_state && (
        <FlatList
          data={misCursosData}
          renderItem={({ item }) => (
            <Curso
              nombre={item.nombre}
              subtitulo={item.subtitulo}
              fecha={item.fecha}
            />
          )}
          keyExtractor={(item) => item.nombre}
        />
      )}

      {favoritos && (
        <FlatList
          data={favoritosData}
          renderItem={({ item }) => (
            <Curso
              nombre={item.nombre}
              subtitulo={item.subtitulo}
              fecha={item.fecha}
            />
          )}
          keyExtractor={(item) => item.nombre}
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
  header_warpper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title_perfil: {
    textAlign: "center",
    fontSize: 24,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
  profile_content: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
    marginBottom: 10,
  },
  text_label: {
    fontSize: 15,
    lineHeight: 17.7,
    fontStyle: "normal",
  },
  input_text: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24.51,
    fontStyle: "normal",
    left: 60,
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
  button_mensaje_style: {
    backgroundColor: "#90C641",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: "#e3f715",
  },
  button_favoritos_style: {
    backgroundColor: "#90C641",
    padding: 10,
    borderRadius: 12,
    marginHorizontal: 30,
    right: 40,
    borderWidth: 1,
    borderColor: "#e3f715",
  },
  button_font: {
    fontFamily: "notoserif",
    fontSize: 16,
    fontWeight: "bold",
  },
  container_buttons: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button_text: {
    fontSize: 16,
    fontFamily: "Roboto",
    textAlign: "center",
    color: "black",
  },
});
