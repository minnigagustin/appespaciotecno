import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
// iconos
import { FontAwesome } from "react-native-vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function curso(props) {
  return (

    <View style={styles.divpadre}>
      <View style={styles.div}>
        <FontAwesome
          name="calendar-check-o"
          size={20}
          color="#fff"
          style={{ top: 5, left: 5, position: "absolute" }}
        />
        <FontAwesome
          name="heart"
          size={20}
          color="#fff"
          style={{ top: 5, right: 10, position: "absolute" }}
        />
        <View style={{ left: -15, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {props.nombre}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>
            {props.subtitulo}
          </Text>
        </View>
        <Text style={{ fontWeight: "300", fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere
          nisl mauris, id ultricies nisi tempor eget. Nam dictum elit nisl,
          vitae ullamcorper...
        </Text>
      </View>
      <View style={styles.divlargo}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.fecha}</Text>
      </View>
    </View>
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
