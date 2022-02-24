import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ModalCambiosConfirmados } from "./ModalCambiosConfirmados";

export const ModalConfirmarCambios = (props) => {
  const navigation = useNavigation();

  const [showConfirmadosModal, setShowConfirmadosModal] = useState(false);

  const setConfirmados = () => {
    props.init();
    setShowConfirmadosModal(true);
  };

  const restoreModal = () => {
    setShowConfirmadosModal(false);
    props.restore();
  };

  return (
    <Modal isVisible={props.state} transparent={true} animationType="slide">
      <View style={styles.background_second_plane}>
        <View style={styles.container}>
          <Text style={styles.titulo_style}> Confirmar Cambios</Text>

          <FontAwesome
            name="info-circle"
            size={70}
            marginRight={55}
            backgroundColor={"#90C641"}
          />
          <Text style={styles.subtitulo_style}>
            {" "}
            ¿Desea guardar los cambios?
          </Text>

          <View style={styles.buttons_container}>
            <TouchableOpacity
              style={styles.aceptar_style}
              onPress={props.restore}
              onRequestClose={() => {
                this.visibleModal(false);
              }}
            >
              <Text style={styles.button_text}> Cancelar </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aceptar_style}
              onPress={() => {
                setConfirmados(props);
              }}
            >
              <Text style={styles.button_text}> Aceptar </Text>
            </TouchableOpacity>
          </View>
        </View>

        {showConfirmadosModal && (
          <ModalCambiosConfirmados
            state={showConfirmadosModal}
            restore={restoreModal}
          />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
    marginLeft: 20,
  },
  button_text: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    width: 120,
    textAlign: "center",
  },
  buttons_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
