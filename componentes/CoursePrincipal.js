import React from "react";
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { Entypo } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

export default class CourseList extends React.Component {
  // GUARDAR CURSO FAVORITO

  guardarfavoritos() {
    const itemcurso = {};
    AsyncStorage.getItem("favoritos")
      .then((datacursos) => {
        if (datacursos !== null) {
          // Si hay data anterior
          const curso = JSON.parse(datacursos);
          curso.push(itemcurso);
          AsyncStorage.setItem("favoritos", JSON.stringify(curso));
        } else {
          const cursos = [];
          cursos.push(itemcurso);
          AsyncStorage.setItem("favoritos", JSON.stringify(cursos));
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  render() {
    let { img, title, bg, onPress, seleccionado, categoria } = this.props;
    if(categoria){
      categoria = categoria.id;
    } else {
      categoria = null;
    };

    const verificarRegistro = () => {
      if (checkCampos()) {
        enviarRegistro();
        actualizarStates();
      } else Alert.alert("POR FAVOR, COMPLETE LOS CAMPOS SOLICITADOS");
    };

    const dias = [
      'Multimedia',
      'Fabricación',
      'Minilab',
      'Ciencias',
      'Sonidos'
    ];

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          backgroundColor: "#d9eefb",
          padding: 20,
          marginHorizontal: 2,
          borderRadius: 20,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 30 / 2,
            borderWidth: 2,
            borderColor: seleccionado ? "#0088c2" : "gray",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {seleccionado ? (
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
                backgroundColor: seleccionado ? "#0088c2" : "gray",
              }}
            ></View>
          ) : null}
        </View>
        <Image
          source={{
            uri: img
              ? img
              : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
          }}
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />

        <Text
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: width / 23,
            paddingLeft: 15,
            width: width / 1.6,
          }}
        >
          {title} |{" "}
          <Text
            style={{
              color: "#E73B77",
              fontWeight: "bold",
            }}
          >
            {dias[categoria-1]}
          </Text>
        </Text>
      </TouchableOpacity>
    );
  }
}
