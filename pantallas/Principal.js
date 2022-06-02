import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
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
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { BASE_URL } from "../api";
import global from "../componentes/global";
import axios from "axios";
import { useState, useEffect } from "react";
 import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "react-native-vector-icons";

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
  const [modaldata, setModaldata] = useState([]);
  const [modaldataInfo, setModaldataInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalCalendario, setModalCalendario] = useState(false);
  const [modalHorarios, setModalHorarios] = useState(false);
  const [modalConfirmado, setModalConfirmado] = useState(false);

  const [isLogged, setIsLogged] = useState(global.authenticated);

  const [catg, setCatg] = useState(0);
  const [selectcatg, setselectCatg] = useState(0);

  const [dia, setDia] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const cursos = BASE_URL + "curso/";
    axios.get(cursos).then((res) => {
      const cursos = res.data;
      setSlider(cursos);
      console.log(cursos);
    });
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        const perfilparse = JSON.parse(perfil);
        setIsLogged(true);
        setPerfil(perfilparse);
      } else {
        console.log("NO HAY NADAAA");
      }
    });
  }, []);

  useEffect(() => {
    console.log("height:" + width / 2.5 + "width:" + (width - 20));
    global.authenticated = isLogged;
  }, [isLogged]);

  const desloguearUsuario = async () => {
    await axios.get(BASE_URL + "logout/");
    setIsLogged(false);
    console.log("Se deslogueo correctamente. " + global.authenticated);
  };

  const abrirmodal = (item) => {
    setModal(true);

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
    };
    setDia(traduccion);
    setModaldata(item);
    console.log(item);
  };

  var today = new Date();
  const fecha = moment(today).format("YYYY-MM-DD");
  const markedDatesArray = {
    [fecha]: { selected: true, selectedColor: "white" },
  };

  const markedDatesArraycalendario = {
    [fecha]: { selected: true, selectedColor: "#055c6e" },
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* COMIENZO MODALS  */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmado}
        onRequestClose={() => {
          setModalConfirmado(false);
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
                color: 'green'
              }}
            >
              ¡Curso registrado!
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 23,
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              {modaldataInfo.nombre}
            </Text>
            <FontAwesome
          name="check"
          size={50}
          color="green"
        />
            
          </View>
        </View>
      </Modal>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalHorarios}
          onRequestClose={() => {
            setModalHorarios(false);
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
                Taller de {"\n"} {modaldataInfo.nombre}
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
              >
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
                  <TouchableOpacity
                    onPress={() => setselectCatg(1)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          selectcatg=== 1
                            ? "#0088c2"
                            : "transparent",
                        color: selectcatg === 1 ? "white" : "gray",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      09:00Hs
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setselectCatg(2)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        color: selectcatg=== 2 ? "white" : "gray",
                        backgroundColor:
                          selectcatg === 2
                            ? "#0088c2"
                            : "transparent",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      12:30Hs
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={{ borderWidth: 0.3, borderColor: "black" }} />

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
                  <TouchableOpacity
                    onPress={() => setselectCatg(3)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          selectcatg === 3
                            ? "#0088c2"
                            : "transparent",
                        color: selectcatg === 3 ? "white" : "gray",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      16:30Hs
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setselectCatg(4)}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        color: selectcatg === 4 ? "white" : "gray",
                        backgroundColor:
                          selectcatg === 4
                            ? "#0088c2"
                            : "transparent",
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        marginTop: 5,
                        borderRadius: 6,
                      }}
                    >
                      18:00Hs
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {setModalHorarios(false);
                setModalConfirmado(true);}}
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalInfo}
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
                fontSize: width / 15,
                marginHorizontal: 20,
                marginTop: 0,
                fontWeight: "bold",
              }}
            >
              Taller de {"\n"} {modaldataInfo.nombre}
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
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
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
                  fontSize: width / 15,
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
                fontSize: width / 18,
                marginHorizontal: 20,
                marginTop: 5,
              }}
            >
              Por favor seleccioná el taller al cual quisieras asistir:
            </Text>
            <View>
              {slider.map((item, i) => {
                return (
                  <CourseList
                    onPress={() => {
                      setCatg(item.id);
                      setModaldataInfo(item);
                    }}
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
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalInfo(true);
                setModal(false);
              }}
            >
              <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCalendario}
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
              fontSize: 35,
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
              fontSize: width / 18,
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            ¿Que taller te gustaria hacer?
          </Text>
          <View style={{ height: 100 }} />
          <View style={{ position: "absolute", bottom: -85, width: width }}>
          <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      autoplayLoopKeepAnimation
      data={slider}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() =>{
         setModaldataInfo(item)
         setModalInfo(true)}
        }
        style={{
          flexDirection: "row",
          backgroundColor: "red",
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
        {/*  <ScrollView
            horizontal
            style={{ position: "absolute", bottom: -85, width: width }}
          >
            {slider
              .filter((cat) => cat.banner)
              .map((item, i) => {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "red",
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
                  </View>
                );
              })}
            </ScrollView> */}
        </LinearGradient>
      </View>
      <View style={{ marginTop: 90 }}>
        <Text style={{ textAlign: "center", fontSize: width / 19 }}>
          En ESPACIO TECNO podras
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: width / 18,
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
            fontSize: width / 19,
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
            fontSize: 24,
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
              borderRadius: 20,
              width: width / 3.5,
            }}
            onPress={() =>
              navigation.navigate("Cate", { screen: "Categorias" })
            }
          >
            <View>
              <Image
                source={require("../assets/DESCUBRIRACCESO.png")}
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
                source={require("../assets/CAPACITARACCESO.png")}
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
              borderRadius: 20,
              width: width / 3.5,
            }}
          >
            <View>
              <Image
                source={require("../assets/EMPRENDERACCESO.png")}
                style={{ width: 110, height: 110 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: "#055c6e",
            fontSize: width / 18,
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 35,
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
