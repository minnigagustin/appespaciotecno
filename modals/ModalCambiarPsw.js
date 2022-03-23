import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export const ModalCambiarPsw = (props) => {
  const navigation = useNavigation();

  const [dni, setDni] = useState("");

  const [psw, setPsw] = useState("");

  const [pswIguales, setPswIguales] = useState();

  const actualizarDni = (text_user) => {
    setDni(text_user);
  };

  const actualizarPsw = (text_user) => {
    setPsw(text_user);
  };

  const verificarPsw = (text_user) => {
    if (text_user !== psw) {
      setPswIguales(false);
      Alert.alert("Las contaseñas deben ser las mismas.");
    } else {
      setPswIguales(true);
    }
  };

  return (
    <Modal isVisible={props.state} transparent={true} animationType="slide">
      <View style={styles.background_second_plane}>
          <View style={styles.container}>
            <Text
              style={styles.text_labels}
            >
              {" "}
              Número de documento.
            </Text>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              keyboardType="number-pad"
              placeholder={"Ingrese su dni"}
              placeholderTextColor= "#b4b4b4"
              onChangeText={(text_user) => actualizarDni(text_user)}
              value={dni}
            ></TextInput>

            <Text
              style={styles.text_labels}
            >
              {" "}
              Nueva contraseña.
            </Text>

            <TextInput
              style={styles.input_style}
              textAlign={"center"}
              keyboardType="default"
              placeholder={"Ingrese su nueva contraseña"}
              placeholderTextColor="#b4b4b4"
              onChangeText={(text_user) => actualizarPsw(text_user)}
              value={psw}
            ></TextInput>

            <Text
              style={styles.text_labels}
            >
              {" "}
              Repetir contraseña.
            </Text>
            <TextInput
              style={styles.input_style}
              keyboardType="default"
              textAlign={"center"}
              placeholder={"Repita su nueva contraseña"}
              placeholderTextColor="#b4b4b4"
              onChangeText={(text_user) => verificarPsw()}
            ></TextInput>

            <TouchableOpacity
              style={[
                styles.ingresar_style,
                {
                  backgroundColor:
                    !dni && !pswIguales ? "#017185" : "rgba(0, 0, 0, 0.15)",
                },
              ]}
              onPress={() => {}}
              disabled={!dni && !pswIguales}
            >
              <Text style={styles.ingresar_text}>GUARDAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.ingresar_style,
              ]}
              onPress={ () => navigation.navigate("Principal")}
            >
              <Text style={styles.ingresar_text}>CANCELAR</Text>
            </TouchableOpacity>

          </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom:10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation:4,
    bottom:0
  },
  ingresar_style: {
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 48,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignSelf: "center",
    marginBottom:30
  },
  input_style: {
    alignSelf: "center",
    alignItems: "stretch",
    fontSize: 20,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "#90C641",
    borderBottomWidth: 1,
    width: width / 1.25,
    padding: 10,
    backgroundColor: "white",
  },
  ingresar_text: {
    fontSize: 13,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
    fontFamily: "Roboto",
  },
  text_labels: {
      paddingHorizontal: 15,
      color: "#000000",
      textAlign: "center",
      fontSize: width / 18,
      fontWeight: "900",
      marginBottom: 30,
  }
});
