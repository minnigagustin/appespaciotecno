import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
// iconos
import { FontAwesome } from "react-native-vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function curso(props) {
  return (

    <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalOk}
          onRequestClose={() => {
            this.setState({ modalOk: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}><TouchableOpacity onPress={() => {
            this.addFavorite();
          }} style={{position: 'absolute', right: 10, top: 10, backgroundColor: 'white', borderRadius: 30, padding: 5, justifyContent: 'center', alignItems: 'center'}}><FontAwesome
        name={this.state.favoritos ? 'heart' : 'heart-o'}
        color={this.state.favoritos ? 'red' : 'black'}
        size={30}
      /></TouchableOpacity>
              <Image
                source={{
                  uri: this.state.dataModal.picture
                    ? this.state.dataModal.picture
                    : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
                }}
                resizeMode="contain"
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: (width / 15)-2,
                  marginHorizontal: 20,
                  marginTop: 8,
                  fontWeight: "bold",
                }}
              >{this.state.dataModal.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  color: 'gray',
                  marginTop: 5,
                }}
              >
                {this.state.dataModal.descripcion}
              </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setState({ modalOk: false, modalVisible: true })
                }
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  );
}

const styles = StyleSheet.create({
  divpadre: {
    width: width - 40,
    height: height / 4,
    margin: 25,
    borderRadius: 12,
  },
  div: {
    backgroundColor: "#90C641",
    padding: 45,
    left: -5,
    width: width - 40,
    height: height / 4,
    paddingTop: 30,
    borderRadius: 12,
  },
  divlargo: {
    backgroundColor: "#4D94C1",
    width: width - 40,
    marginLeft: 20,
    alignItems: "center",
    position: "absolute",
    bottom: -20,
    height: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inscribir_button: {
    backgroundColor:"#90C641",
    borderRadius:5
  },
  container: {
    alignItems:"flex-end",
    fontSize: 20,
    fontFamily: "Roboto",
    left:30
  }
});
