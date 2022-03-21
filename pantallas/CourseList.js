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
    const { img, title, bg, onPress } = this.props;

    const verificarRegistro = () => {
      if (checkCampos()) {
        enviarRegistro();
        actualizarStates();
      } else Alert.alert("POR FAVOR, COMPLETE LOS CAMPOS SOLICITADOS");
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          backgroundColor: "#d9eefb",
          padding: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Image source={img} style={{ width: 40, height: 40 }} />

        <View>
          <Text
            style={{
              color: "#345c74",
              fontWeight: "bold",
              fontSize: width / 23,
              paddingHorizontal: 15,
              width: width / 2.5,
            }}
          >
            {title}
          </Text>
        </View>
        <View
          onPress={() => this.props.navigation.navigate("Categorias")}
          style={{
            flexDirection: "row",
            backgroundColor: "#0088c2",
            alignItems: "center",
            width: 110,
            paddingVertical: 10,
            borderRadius: 10,
            marginLeft: -15,
            paddingHorizontal: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontWeight: "bold",
              fontSize: width / 28,
            }}
          >
            INSCRIBIRME
          </Text>
          <Entypo name={"chevron-right"} size={18} color="white" />
        </View>
      </TouchableOpacity>
    );
  }
}
