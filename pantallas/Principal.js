import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { BASE_URL } from "../api";
import global from "../componentes/global";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

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

export default function Principal({route}) {
  const [perfil, setPerfil] = useState([]);

  const [slider, setSlider] = useState([]);

  const [isLogged, setIsLogged] = useState(global.authenticated);

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
    console.log("ENTRE AL USEEFFECT");
    global.authenticated = isLogged;
  }, [isLogged]);

  const desloguearUsuario = async () => {
    await axios.get(BASE_URL + "logout/");
    setIsLogged(false);
    console.log("Se deslogueo correctamente. " + global.authenticated);
  };

  var today = new Date();
  const fecha = moment(today).format("YYYY-MM-DD");
  const markedDatesArray = {
    [fecha]: { selected: true, selectedColor: "white" },
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.8, y: 0.5 }}
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
          {isLogged && (
            <TouchableOpacity onPress={() => desloguearUsuario()}>
              <Text
                style={{
                  paddingHorizontal: 8,
                  fontSize: 15,
                  paddingTop: 5,
                  alignSelf: "flex-end",
                  paddingRight: 10,
                  fontWeight: "bold",
                  color: "#FFF",
                }}
              >
                {" "}
                Cerrar Sesión{" "}
              </Text>
            </TouchableOpacity>
          )}
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
          <ScrollView
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

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#e41c24",
                marginTop: 15,
                marginHorizontal: 20,
                elevation: 7,
                borderRadius: 20,
                marginBottom: 16,
                paddingVertical: 30,
                paddingLeft: 30,
                width: width - 20,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 250,
                    paddingRight: 100,
                  }}
                >
                  ¿Queres aprender?
                </Text>
              </View>
              <Image
                source={require("../assets/undraw.png")}
                style={{ marginLeft: -80, marginTop: 35 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#3499c2",
                marginTop: 15,
                marginHorizontal: 20,
                elevation: 7,
                borderRadius: 20,
                marginBottom: 16,
                paddingVertical: 30,
                paddingLeft: 30,
                width: width - 20,
              }}
            >
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                    width: 250,
                    paddingRight: 100,
                  }}
                >
                  ¿Queres capacitarte?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Categorias")}
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#90C641",
                    alignItems: "center",
                    marginTop: 20,
                    width: 150,
                    paddingVertical: 10,
                    borderRadius: 14,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    Conocenos
                  </Text>
                  <Image
                    source={require("../assets/a3.png")}
                    style={{ marginLeft: 20, width: 8, height: 8 }}
                  />
                </TouchableOpacity>
              </View>
              <Image
                source={require("../assets/undraw.png")}
                style={{ marginLeft: -80, marginTop: 35 }}
              />
            </View>
          </ScrollView>
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
          <View
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
          </View>
          <View
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
          </View>
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
              console.log("selected day", day);
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
