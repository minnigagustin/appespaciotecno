import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const avanceData = {
  nombre: "React",
  imagen: require("../assets/image1.png"),
  descripcion: "De Junior a Senior",
  nro_clases: 5,
  total_clases: 10,
};

export const ModalConfirmarEliminarCurso = (props) => {
  const navigation = useNavigation();
  return (
    <Modal isVisible={props.state} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Text style={styles.titulo_style}> {avanceData.nombre}</Text>
          <Text style={styles.subtitulo_style}> {avanceData.descripcion}</Text>

          <View style={styles.icon_styles}>
            <FontAwesome
              name="thumbs-o-up"
              size={90}
              marginBottom={20}
              color={"#90C641"}
            />
            <Text style={styles.text_eliminado}>
              {" "}
              Curso eliminado con éxito
            </Text>
          </View>

          <View style={styles.container_salir}>
            <TouchableOpacity
              style={styles.boton_style}
              onPress={props.restore}
              onPressOut={() => navigation.navigate("MisCursos")}
            >
              <Text style={styles.texto_style}>Salir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.65,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 0.85,
  },
  titulo_style: {
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "Roboto",
    marginBottom: 10,
    marginTop: 30,
  },
  subtitulo_style: {
    fontWeight: "normal",
    fontSize: 18,
    marginBottom: 20,
    marginTop: 10,
  },
  boton_style: {
    backgroundColor: "#4D94C1",
    borderRadius: 34,
    marginTop: 40,
    width: 200,
    height: 40,
  },
  texto_style: {
    fontFamily: "Roboto",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  icon_styles: {
    fontSize: 80,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  container_salir: {
    justifyContent: "center",
    alignItems: "center",
  },
  text_eliminado: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
});
