import { StyleSheet, Text, View, Modal, TouchableOpacity, Dimensions, Pressable, Image } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
const { width, height } = Dimensions.get("window");

export const ModalDetallesCurso = (props) => {
  const navigation = useNavigation();
  const img = "https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2021/05/ROBLOX-CLIPARTS-8.png?ssl=1";

  return (
    <Modal
          animationType="slide"
          transparent={true}
          visible={props.visibilidad}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            props.visibilidad(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Image
          source={{
            uri: img
              ? img
              : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
          }}
          style={{ width: 100, height: 100, borderRadius: 10 }}
        />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 15,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}
              >{props.data.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
              >
                {props.data.descripcion}
              </Text>
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({ modalH: false })}
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    marginTop: 14,
    padding: 10,
    width: 240,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
