import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

export const ModalDetallesCurso = (props) => {
  const navigation = useNavigation();

  return (
    <Modal isVisible={props.state} transparent={true} animationType="slide">
      <View style={styles.background_second_plane}>
        <View style={styles.container}>
          <Text> {props.nombre}</Text>
          <FontAwesome
            name="save"
            size={70}
            marginRight={55}
            backgroundColor={"#90C641"}
          />
          <Text>{props.subtitulo}</Text>
          <Text>{props.descripcion}</Text>
          <Text>{props.profesor}</Text>
          <TouchableOpacity
            style={styles.aceptar_style}
            onPress={() => {
              props.restore;
              navigation.goBack();
            }}
            onRequestClose={() => {
              isVisible(false);
            }}
          >
            <Text style={styles.button_text}> Regresar </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.aceptar_style}
            onPress={() => {
              props.restore;
              navigation.navigate("Mis Cursos", {
                param_usuario: props.user,
              });
            }}
            onRequestClose={() => {
              isVisible(false);
            }}
          >
            <Text style={styles.button_text}> Inscribirse </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 33,
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
  background_second_plane: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  aceptar_style: {
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
