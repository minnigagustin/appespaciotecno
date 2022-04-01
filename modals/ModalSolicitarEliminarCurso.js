import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";

import { FontAwesome } from "react-native-vector-icons";

const avanceData = {
  nombre: "React",
  imagen: require("../assets/image1.png"),
  descripcion: "De Junior a Senior",
};

export const ModalSolicitarEliminarCurso = (props) => {
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
          <Text style={styles.text_solicitar}>
            {" "}
            Si confirmas salir del curso se eliminara de tu base de datos y no
            podras volver a ingresar.
          </Text>

          <View style={styles.container_botones}>
            <TouchableOpacity
              style={styles.boton_cancelar}
              onPress={props.restore}
            >
              <Text style={styles.texto_style}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.boton_desvincular}
              onPress={props.restore, props.eliminar}
            >
              <Text style={styles.texto_style}>Desvincular</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
  boton_cancelar: {
    backgroundColor: "#4D94C1",
    borderRadius: 34,
    marginTop: 40,
    width: 200,
    height: 40,
  },
  boton_desvincular: {
    backgroundColor: "#FA0000",
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
  container_botones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text_solicitar: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
});
