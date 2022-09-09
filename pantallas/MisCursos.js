import { View, Text, Image, StyleSheet, FlatList, Pressable, Dimensions, ImageBackground, Linking } from "react-native";

import { Entypo } from "react-native-vector-icons";

import React, { useEffect } from "react";

import Curso from "../componentes/curso";

import { useState } from "react";
import Loading from "./Loading";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { axiosLoggedInConfig, BASE_URL } from "../api";

const { width, height } = Dimensions.get("window");
import global from "../componentes/global"

export default function Perfil({ route }) {
  const navigation = useNavigation();

 

  const [cursos, setCursos] = useState([]);

  const [cursosFavoritos, setCursosFavoritos] = useState([]);
  const [asistencia, setAsistencia] = useState(0);
  const [perfil, setPerfil] = useState([]);
  const [mostrarCursos, setMostrarCursos] = useState(false);
  const [dataFechas, setDataFechas] = useState([]);
  const [modalCalendario, setModalCalendario] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const abrirFavoritos = () => {
    getCursos();

    setMostrarCursos(!mostrarCursos);
  };

  const getCursos = () => {
    BASE_URL.get(`curso/`).then((res) => {
      const cursos = res.data;
      setCursos(cursos);
    });
  };
  const param_usuario  = perfil;

  const getComisionesData = (fechas) => {
    setDataFechas(fechas);
    console.log(fechas);
    setModalCalendario(true);
   
  };
  useEffect(() => {
    setModalLoading(true);
  AsyncStorage.getItem("perfil").then((perfil) => {
    if (perfil !== null) {
      const perfilparse = JSON.parse(perfil);
      console.log(perfilparse)
      setPerfil(perfilparse);
      const cursos = BASE_URL + "comisionesbyalumno/";
    axiosLoggedInConfig().get(cursos).then((res) => {
      const cursos = res.data;
      setCursos(cursos);
      console.log(cursos);
      setModalLoading(false);
    });
    const asistencia = BASE_URL + "porcentajeasistenciacursos/";
    axiosLoggedInConfig().get(asistencia).then((res) => {
      const asistenciadata = res.data;
      const asisnum = asistenciadata.porcentaje_asistencia.split(' ')[0];
      setAsistencia(Number(asisnum).toFixed(2));
      console.log(asistenciadata);
    });
    } else {
      console.log("NO HAY NADAAA");
    }
  });
}, []);
var today = new Date();
const fecha = moment(today).format("YYYY-MM-DD");
let markedDatesCursosArray = {};
dataFechas.forEach((val) => {
  markedDatesCursosArray[val.fecha] = { selected: true, selectedColor: "#00789d", disableTouchEvent: false };
});

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <Modal
        
        animationIn="bounceInUp"
                animationOut="slideOutRight"
                backdropTransitionOutTiming={0}
                onBackdropPress={() => {
                  setModalCalendario(false);
                }}
        isVisible={modalCalendario}
        onRequestClose={() => {
          setModalCalendario(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 15,
                marginHorizontal: 20,
                marginTop: 0,
                fontWeight: "bold",
              }}
            >
              Selecciona una fecha
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 23,
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              Estas son las fechas a las que estas inscripto:
            </Text>
            <Calendar
              enableSwipeMonths
              disabledByDefault={true}
              disableAllTouchEventsForDisabledDays={true}
              onDayPress={(day) => {
               console.log(day);
              }}
              theme={{
                calendarBackground: "white",
                todayTextColor: "white",
                monthTextColor: "black",
                dayTextColor: "black",
                textMonthFontSize: 20,
                arrowColor: "black",
                dotColor: "black",
                todayTextColor: "#00789d",
                textDayHeaderFontSize: 20,
                textSectionTitleColor: "black",
                textMonthFontWeight: "bold",
                selectedDayTextColor: "white",
              }}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
              firstDay={1}
              markedDates={markedDatesCursosArray}
            />
          </View>
        </View>
      </Modal>
      <Loading visible={modalLoading}/>
      <ImageBackground
          source={require("../assets/fondo_login.webp")}
          imageStyle={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 100}}
          style={{ resizeMode: "stretch", width: width, paddingBottom: 20, borderRadius: 20}}
        >
      <Text style={styles.header_text}>
        {" "}
        Tus cursos, {param_usuario.nombre} {param_usuario.apellido}
      </Text>

      <Image
        source={{ uri: param_usuario.picture ? param_usuario.picture : (param_usuario.genero_persona === 'Masculino' ? 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043238-avatar-boy-kid-person_113284.png' : 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043250-avatar-child-girl-kid_113270.png') }}
        style={{
          height: 150,
          width: 150,
          overflow: "hidden",
    borderWidth: 4,
    borderColor: "white",
          borderRadius: 150,
          alignSelf: "center",
        }}
      /></ImageBackground>
      <View style={{backgroundColor: 'white', borderRadius: 6, width: width/1.2, height: 90, top: -10, elevation: 7, justifyContent: 'center', alignItems: 'center'}}>
       <Text style={{color: 'green', fontSize: 28, fontWeight: 'bold'}}>{asistencia}/100%</Text>
        <Text style={{color: 'black', fontSize: 14, fontWeight:'600'}}>Asistencia</Text>
      </View>

    

          {cursos.map((item, key)=>{
        return(<TouchableOpacity onPress={() => getComisionesData(item.fechas)} key={key} style={{width: width-40,
          borderRadius: 10,padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', elevation: 4, marginTop: 10}}>
            <View>
            <Image source={{ uri: 'https://tecnotest.bahia.gob.ar' + item.curso.picture }}
        style={{
          height: 60,
          width: 60,
          borderRadius: 10,
          alignSelf: "center", 
        }} /></View>
        <View><View>
            <Text style={{fontSize: 14 ,color: 'black', fontWeight: 'bold'}}>{item.curso.nombre}</Text></View>
            <View style={{width: width/1.8}}><Text style={{flex: 1, fontSize: 12, color: 'black', }} numberOfLines = {1}>{item.curso.subtitulo}sss</Text></View></View>
            <View style={{backgroundColor: "rgba(0, 0, 0, 0.02)", padding: 2, borderRadius: 8}}>
            <Entypo name={'magnifying-glass'} size={35} color="green" />
            </View>
          </TouchableOpacity>)
               })
             }

      
          <TouchableOpacity>
              <Image  source={{ uri: 'https://digital.bahia.gob.ar/espaciotecno/LOGO-APP.gif' }} style={{width: width/1.5, height: 120}} resizeMode="contain" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header_text: {
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: 'white',
    fontFamily: "Roboto",
    textAlign: "center",
  },
  header: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title_perfil: {
    textAlign: "center",
    fontSize: 24,
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
  },
  paneltab: {
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    marginTop: 24,
    padding: 10,
    width: width/1.3,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#0086bf",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 22,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
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
});
