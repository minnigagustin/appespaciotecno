import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
  Alert,
  Linking,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourseList from "../componentes/CoursePrincipal";
import { BASE_URL, axiosLoggedInConfig } from "../api";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Modal from "react-native-modal";
import global from "../componentes/global";
import Loading from "./Loading";
import axios from "axios";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useState, useEffect, useRef } from "react";
 import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";
import { set } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["D", "L", "M", "M", "J", "V", "S"],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

export default function Principal({ route }) {
  const [perfil, setPerfil] = useState([]);

  const [slider, setSlider] = useState([]);
  const [cursosfechas, setCursosFechas] = useState([]);
  const [modaldata, setModaldata] = useState([]);
  const [modaldataInfo, setModaldataInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalCalendario, setModalCalendario] = useState(false);
  const [modalHorarios, setModalHorarios] = useState(false);
  const [fechadate, setFecha] = useState('')
  const [modalConfirmado, setModalConfirmado] = useState(false);
  const [dataFechas, setDataFechas] = useState([]);
  const [isLogged, setIsLogged] = useState(global.authenticated);
  const [diasdictado, setDiasDictado] = useState([]);
  const [catg, setCatg] = useState(0);
  const [selectcatg, setselectCatg] = useState(0);
  const [horaseleccionada, sethoraseleccionada] = useState('')
  const [modalFechas, setModalFechas] = useState(false);

  const [selectHorario, setSelectHorario] = useState(0)

  const [dia, setDia] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const cursos = BASE_URL + "curso/";
    axiosLoggedInConfig().get(cursos).then((res) => {
      const cursos = res.data;
      const slid = cursos.filter((cat) => cat.banner);
      setSlider(slid);
    });
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        const perfilparse = JSON.parse(perfil);
        setIsLogged(true);
        setPerfil(perfilparse);
      } else {
      }
    });
  }, []);

  

  useEffect(() => {
    global.authenticated = isLogged;
  }, [isLogged]);

  const desloguearUsuario = async () => {
    setIsLogged(false);
  };

  const abrirmodal = (item) => {
    setModalLoading(true);
    setCursosFechas([]);
    setCatg(0);
setModaldataInfo([]);

    const dias = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const numeroDia = new Date(item.dateString).getDay();
    const numeroMes = new Date(item.dateString).getMonth();
    const nombreDia = dias[numeroDia];
    const nombreMes = monthNames[numeroMes];
    const traduccion = {
      dia: nombreDia,
      mes: nombreMes,
      numero: item.day,
      year: item.year
    };
    console.log(traduccion)
    setFecha(item.dateString);
    const cursos = BASE_URL + "cursosbyfecha/?fecha=" + item.dateString;
    axiosLoggedInConfig().get(cursos).then((res) => {
      const cursos = res.data;
      setCursosFechas(cursos);
      if(cursos.length){setModal(true);
      } else {
        Alert.alert('Ups! No tenemos cursos', 'Lo sentimos, prueba con otra fecha y disfruta de Espacio Tecno ;)')
      }
      
      setModalLoading(false);
      
    });
    setDia(traduccion);
    setModaldata(item);
  };

  const onClickHora = () => {
    const dias = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    setSelectHorario(0);
    sethoraseleccionada('');
    const numeroDia = new Date(fecha).getDay();
    const numeroMes = new Date(fecha).getMonth();
    const nombreDia = dias[numeroDia];
    const nombreMes = monthNames[numeroMes];
    const traduccion = {
      dia: nombreDia,
      mes: nombreMes,
      numero: fecha.day,
      year: fecha.year
    };
    const id = catg;
    setModalLoading(true);
    // this.setState({modalLoading: true, dia: traduccion});
    const curso = BASE_URL + "horarioscursobyfechaandcursoid/?id_curso=" + id + "&fecha=" + fechadate;
    axiosLoggedInConfig().get(curso).then((res) => {
      setDiasDictado(res.data);
      console.log('hecho')
      console.log(diasdictado);
      setModal(false);
      setModalHorarios(true);
      setModalLoading(false);
  });
  }

  const onClickHoraModal = (fecha, id) => {
    const dias = [
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
      "Domingo",
    ];

    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const numeroDia = new Date(fecha).getDay();
    const numeroMes = new Date(fecha).getMonth();
    const nombreDia = dias[numeroDia];
    const nombreMes = monthNames[numeroMes];
    setSelectHorario(0);
    sethoraseleccionada('');
    const traduccion = {
      dia: nombreDia,
      mes: nombreMes,
      numero: fecha.day,
      year: fecha.year
    };
    setDia(traduccion);
    setModalLoading(true);
    const curso = BASE_URL + "horarioscursobyfechaandcursoid/?id_curso=" + id + "&fecha=" + fecha.dateString;
    axiosLoggedInConfig().get(curso).then((res) => {
      setDiasDictado(res.data);
      console.log(diasdictado);
      setModalFechas(false);
      setModalHorarios(true);
      setModalLoading(false);
  });
  }

  const onClickRegistrado = () => {
    const curso = BASE_URL + "inscripto/";
    const comisionid = selectHorario;
    console.log(comisionid);
    axiosLoggedInConfig().post(curso, {comision: comisionid}).then((res) => {
      console.log(res.data);
      setModalHorarios(false);
                setModalConfirmado(true); 

  }).catch((err)=>{
    Alert.alert('Ey! Ya estas inscripto', 'Ups, no te pudimos volver a inscribir ya que te inscribiste anteriormente')
  })
  }

  const buscarFecha = (data) => {
    setModalLoading(true);
    const curso = BASE_URL + "fechasdictadobycursoid/?id_curso=" + data.id;
    axiosLoggedInConfig().get(curso).then((res) => {
      console.log(res.data)
      setModaldataInfo(data);
      setDataFechas(res.data);
      setModalFechas(true);
      setModalLoading(false);
  });
  }

  var today = new Date();
  const fecha = moment(today).format("YYYY-MM-DD");
  const markedDatesArray = {
    [fecha]: { selected: true, selectedColor: "white" },
  };

  const markedDatesArraycalendario = {
    [fecha]: { selected: true, selectedColor: "#055c6e" },
  };

  let markedDatesCursosArray = {};
dataFechas.forEach((val) => {
  markedDatesCursosArray[val] = { selected: true, selectedColor: "#00789d", disableTouchEvent: false };
});

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* COMIENZO MODALS  */}

      
        <Loading visible={modalLoading}/>

        <Modal
          isVisible={modalFechas}
          animationIn="bounceInUp"
                  animationOut="slideOutRight"
                  backdropTransitionOutTiming={0}
                  onBackdropPress={() => {
                    setModalFechas(false);
                  }}
          onRequestClose={() => {
            setModalFechas(false);
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
              >{modaldataInfo.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
              >
                Por favor seleccioná la fecha en la cual quisieras asistir:
              </Text>
              <Calendar
                enableSwipeMonths
                disabledByDefault={true}
                disableAllTouchEventsForDisabledDays={true}
                onDayPress={(day) => {
                  onClickHoraModal(day, modaldataInfo.id)
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
              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setState({ modalVisible: false, modalHorarios: true })
                }
              >
                <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>

      <Modal
        isVisible={modalConfirmado}
        animationIn="bounceInUp"
                animationOut="slideOutRight"
                backdropTransitionOutTiming={0}
                onBackdropPress={() => {
                  setModalConfirmado(false);
                }}
        onRequestClose={() => {
          setModalConfirmado(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={{ margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,}}>
          <ImageBackground
          source={require("../assets/fondo-inscripcion.webp")}
          imageStyle={{ borderRadius: 20}}
          style={{ resizeMode: "stretch", width: width-40, borderRadius: 20}}
        >
          <Image
                source={{
                  uri: modaldataInfo.picture
                  ? modaldataInfo.picture
                  : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
                }}
                resizeMode="contain"
                style={{
                  height: 100,
                  width: 100,
                  marginVertical: 40,
                  alignSelf: "center",
                }}
              />
        </ImageBackground>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 15,
                marginHorizontal: 20,
                marginTop: 0,
                fontWeight: "bold",
                color: 'green'
              }}
            >
              ¡Felicitaciones!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                marginHorizontal: 20,
                marginHorizontal: 30,
                color: '#282828',
                marginTop: 5,
              }}
            >
              Ya estás inscripto a
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                marginHorizontal: width/6,
                color: '#282828',
                fontWeight: 'bold'
              }}
            >
              {modaldataInfo.nombre}
            </Text>
            <View style={{
   borderBottomColor: '#282828',
   marginVertical: 14,
   borderBottomWidth: 0.8, 
   width: width/2,}}>
</View>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                marginHorizontal: 20,
                color: '#282828',
              }}
            >
              <Text style={{fontWeight: 'bold'}}>{dia.dia} {dia.numero} de {dia.mes}</Text> de {dia.year}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                color: '#282828',
                marginHorizontal: 20,
              }}
            >
              Turno {horaseleccionada > '09:00:00' && horaseleccionada < '13:00:00' ? 'mañana' : 'tarde'
              } | <Text style={{fontWeight: 'bold'}}>{moment(horaseleccionada, "H:mm:ss").format("HH:mm")}Hs</Text>
            </Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalConfirmado(false)
                }
              >
                <Text style={styles.textStyle}>{"< "}VOLVER</Text>
              </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
          isVisible={modalHorarios}
          animationIn="bounceInUp"
                  animationOut="slideOutRight"
                  backdropTransitionOutTiming={0}
                  onBackdropPress={() => {
                    setModalHorarios(false);
                  }}
          onRequestClose={() => {
            setModalHorarios(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: (width / 17)-2,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}
              >{modaldataInfo.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
              >
                Por favor seleccioná el turno en la cual quisieras asistir:
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  padding: 3,
                  marginVertical: 20,
                }}
              >{diasdictado.find((cat) => cat.dia_comision.horario_inicio > '01:00:00' && cat.dia_comision.horario_inicio < '13:00:00') && (
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Mañana
                  </Text>
                  {diasdictado.filter((cat) => cat.dia_comision.horario_inicio > '01:00:00' && cat.dia_comision.horario_inicio < '13:00:00').map((item, i) => {
                  return (
                  <TouchableOpacity
                    onPress={() => { setSelectHorario(item.comision_id), sethoraseleccionada(item.dia_comision.horario_inicio)}}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          selectHorario === item.comision_id
                            ? "#0088c2"
                            : "transparent",
                        color: selectHorario === item.comision_id ? "white" : "gray",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      {moment(item.dia_comision.horario_inicio, "H:mm:ss").format("HH:mm")}Hs
                    </Text>
                  </TouchableOpacity>);
                })}

                </View>
                )}
                  {diasdictado.find((cat) => cat.dia_comision.horario_inicio > '12:59:00' && cat.dia_comision.horario_inicio < '23:59:00') && (
                <View style={{ marginHorizontal: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Tarde
                  </Text>
                  {diasdictado.filter((cat) => cat.dia_comision.horario_inicio > '12:59:00' && cat.dia_comision.horario_inicio < '23:59:00').map((item, i) => {
                  return (
                  <TouchableOpacity
                  onPress={() => { setSelectHorario(item.comision_id), sethoraseleccionada(item.dia_comision.horario_inicio)}}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          selectHorario === item.comision_id
                            ? "#0088c2"
                            : "transparent",
                        color: selectHorario === item.comision_id ? "white" : "gray",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      {moment(item.dia_comision.horario_inicio, "H:mm:ss").format("HH:mm")}Hs
                    </Text>
                  </TouchableOpacity>);
                })}
                  
                </View>
                )}
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose, {marginTop: 2, backgroundColor:
                  selectHorario > 0 ? "#0086bf" : "rgba(0, 0, 0, 0.15)"}]}
                onPress={() => {onClickRegistrado();}}
                disabled={selectHorario === 0 ? true : false}
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      <Modal
        isVisible={modalInfo}
        animationIn="bounceInUp"
                animationOut="slideOutRight"
                backdropTransitionOutTiming={0}
                onBackdropPress={() => {
                  setModalInfo(false);
                }}
        onRequestClose={() => {
          setModalInfo(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image
              source={{
                uri: modaldataInfo.picture
                  ? modaldataInfo.picture
                  : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
              }}
              resizeMode="contain"
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: (width / 17)-2,
                marginHorizontal: 20,
                marginTop: 8,
                fontWeight: "bold",
              }}
            >{modaldataInfo.nombre}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 23,
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              {modaldataInfo.descripcion}
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalInfo(false)
              setModalHorarios(true)}}
            >
              <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
        animationIn="bounceInUp"
        animationOut="slideOutRight"
        backdropTransitionOutTiming={0}
        onBackdropPress={() => {
          setModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                textAlign: "center",
                fontSize: (width / 15)-2,
                marginHorizontal: 20,
                marginTop: 0,
                fontWeight: "bold",
              }}
            >
              Talleres Disponibles
            </Text>
            <TouchableOpacity
              onPress={() => {
                setModal(false), setModalCalendario(true);
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: (width / 15)-2,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                  color: "#2783C5",
                }}
              >
                {dia.dia} {modaldata.day} de {dia.mes}
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                textAlign: "center",
                fontSize: (width / 20)-2,
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              Por favor seleccioná el taller al cual quisieras asistir:
            </Text>
            <View>
              {cursosfechas.map((item, i) => {
                return (
                  <CourseList
                  key={i}
                    onPress={() => {
                      setCatg(item.id);
                      setModaldataInfo(item);
                    }}
                    descripcion={item.descripcion}
                    img={item.picture}
                    title={item.nombre}
                    categoria={item.categoria}
                    bg="#fdddf3"
                    seleccionado={catg === item.id ? true : false}
                  />
                );
              })}
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose, {
                backgroundColor:
                  catg > 0 ? "#0086bf" : "rgba(0, 0, 0, 0.15)",
              },]}
              onPress={() => {
                onClickHora();
              }}
              disabled={catg === 0 ? true : false}
            >
              <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
              Por favor seleccioná la fecha en la cual quisieras asistir:
            </Text>
            <Calendar
              enableSwipeMonths
              minDate={fecha}
              onDayPress={(day) => {
                setModalCalendario(false);
                abrirmodal(day);
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
              markedDates={markedDatesArraycalendario}
              disableAllTouchEventsForDisabledDays={true}
              disabledDaysIndexes={[5, 6]}
            />
          </View>
        </View>
      </Modal>

      <View>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.8, y: 0.5 }}
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: scale(22),
              paddingTop: 10,
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            Bienvenido {perfil ? perfil.nombre : "Registrate"}!
          </Text>
          <Text
            style={{
              paddingHorizontal: 15,
              textAlign: "center",
              fontSize: scale(18),
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            ¿Que taller te gustaria hacer?
          </Text>
          <View style={{ height: width/4.2 }} />
          <View style={{ position: "absolute", bottom: -85, width: width }}>
          <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      autoplayLoopKeepAnimation
      data={slider}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => {
          buscarFecha(item);
        }}
        style={{
          flexDirection: "row",
          backgroundColor: "transparent",
          marginTop: 15,
          marginHorizontal: 10,
          elevation: 7,
          borderRadius: 20,
          marginBottom: 16,
          height: width / 2.5,
          width: width - 20,
        }}
      >
        <ImageBackground
          source={{ uri: item.banner }}
          resizeMode="cover"
          style={{
            width: "100%",
            borderRadius: 10,
            overflow: "hidden",
          }}
        ></ImageBackground>
      </TouchableOpacity>
      )}
    />
    </View>
        </LinearGradient>
      </View>
      <View style={{ marginTop: 90 }}>
        <Text style={{ textAlign: "center", fontSize: scale(16) }}>
          En ESPACIO TECNO podras
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize:  scale(18),
            fontWeight: "bold",
          }}
        >
          <Text style={{ color: "#eb0032" }}>descubrir,</Text>{" "}
          <Text style={{ color: "#3499c2" }}>capacitarte</Text>{" "}
          <Text style={{ color: "#a1b94b" }}>y emprender</Text>
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: (width / 19)-2,
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          Cada area cuenta con talleres y cursos para potenciar tu conocimiento.
        </Text>
        <Text
          style={{
            color: "#353535",
            fontWeight: "bold",
            fontSize: (width/18)-2,
            paddingHorizontal: 20,
            textAlign: "center",
            marginBottom: 1,
          }}
        >
          ¡Descubrilos!
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: "center",
            alignSelf: "center",
            marginBottom: 1,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#eb0032",
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 3,
              borderRadius: 10,
              width: width / 3.5,
            }}
            onPress={() =>
              navigation.navigate("Cate", { screen: "Categorias" })
            }
          >
            <View>
              <Image
                source={require("../assets/DESCUBRIRACCESO.webp")}
                style={{ width: 110, height: 110 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cate", { screen: "Capacitar" })}
            style={{
              backgroundColor: "#3499c2",
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 3,
              marginHorizontal: 10,
              borderRadius: 10,
              width: width / 3.5,
            }}
          >
            <View>
              <Image
                source={require("../assets/CAPACITARACCESO.webp")}
                style={{ width: 110, height: 110 }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Cate", { screen: "Emprender" })}
            style={{
              backgroundColor: "#a1b94b",
              marginTop: 15,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 3,
              borderRadius: 10,
              width: width / 3.5,
            }}
          >
            <View>
              <Image
                source={require("../assets/EMPRENDERACCESO.webp")}
                style={{ width: 110, height: 110 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "#055c6e",
            fontSize: width * 0.051,
            marginTop: 23,
            paddingHorizontal: 20,
            paddingVertical: 10,
            textAlign: "center",
            backgroundColor: "#d5e4d4",
          }}
        >
          Mira las{" "}
          <Text style={{ fontWeight: "bold" }}>actividades por fecha</Text>
        </Text>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.8, y: 0.5 }}
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
          <Calendar
            // Handler which gets executed on day press. Default = undefined
            // Handler which gets executed on day long press. Default = undefined
            onDayPress={(day) => {
              abrirmodal(day);
            }}
            minDate={fecha}
            theme={{
              calendarBackground: "transparent",
              todayTextColor: "white",
              monthTextColor: "white",
              dayTextColor: "white",
              textMonthFontSize: 20,
              arrowColor: "white",
              dotColor: "white",
              todayTextColor: "black",
              textDayHeaderFontSize: 20,
              textSectionTitleColor: "white",
              textMonthFontWeight: "bold",
              selectedDayTextColor: "black",
              selectedDayBackgroundColor: "black",
              selectedDotColor: "white",
              selectedDotColor: "blue",
            }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            markedDates={markedDatesArray}
            disableAllTouchEventsForDisabledDays={true}
            disabledDaysIndexes={[5, 6]}
            // Hide month navigation arrows. Default = false
            // Do not show days of other months in month page. Default = false
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Hide day names. Default = false
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={(addMonth) => addMonth()}
            // Disable left arrow. Default = false
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </LinearGradient>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
