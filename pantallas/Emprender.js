import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  StyleSheet,
  Pressable,
  Linking,
  ImageBackground,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "../componentes/CourseList";
import axios from "axios";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CategoriasList from "../componentes/EmprendeButton";
import { BASE_URL } from "../api";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { ModalDetallesCurso } from "../modals/ModalDetallesCurso";
import moment from "moment";
const { width, height } = Dimensions.get("window");

export default class Cources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      modalVisible: false,
      selectCatg: 0,
      modalHoras: false,
      dataModal: [],
      modalOk: false,
      multimedia: true,
      fabricacion: false,
      minilab: false,
      ciencias: false,
      sonidos: false,
      modalHorarios: false,
    };
  }


  render() {

    return (
      <ImageBackground
        source={require("../assets/EMPRENDER-FONDO.webp")}
        style={{ width: "100%", height: "100%" }}
      >

        <Image
          source={require("../assets/EMPRENDER-CABEZAL.webp")}
          resizeMode="contain"
          style={{
            width: scale(200),
            height: scale(150),
            alignSelf: "center",
          }}
        />

<Text style={{marginTop:1, width: width*0.80, color: 'white', fontSize: width*0.045, textAlign: 'center', alignSelf: 'center'}}>Un espacio donde la ciudadanía, organizaciones, emprendedores y el gobierno nos encontramos para <Text style={{fontWeight: 'bold'}}>pensar ideas creativas para diseñar y construir a Bahía como ciudad del conocimiento, la innovación y las tecnologías.</Text> </Text>

<Text style={{marginTop:width*0.050, width: width*0.90, color: 'black',fontWeight: 'bold', fontSize: width*0.050, textAlign: 'center', alignSelf: 'center'}}>Te invitamos a descubrir cómo este espacio de vinculación, puede potenciar tu emprendimiento.</Text>
<View style={{position: 'absolute', bottom: 20, width: width}}>

<CategoriasList
              onPress={() => Linking.openURL('https://espaciotecno.bahia.gob.ar/#emprender')}
              img={require("../assets/fondo-emprender.webp")}
              title="¡EMPRENDER!"
              bg="white"
            />
</View>
        
      </ImageBackground>
    );
  }
}

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
