import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
<<<<<<< HEAD
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';
=======
import axios from "axios";
>>>>>>> 46f2b3740b28abea848f58f0db431ac9dbd649f1

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        const perfilparse = JSON.parse(perfil);
        this.setState({ perfil: perfilparse });
      } else {
        console.log("NO HAY NADAAA");
      }
    });
  }

  //cuando se deje de usar clase, crear un state que consulte si el usuario esta logueado, si es true, entonces mostrar el texto
  //de abandonar sesión, en cambio si es falso (por defecto), no muestra nada

  async desloguearUsuario() {
    await axios.get("http://128.0.202.248:8011/logout/");
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View>
        <LinearGradient
        start={{x: 0.0, y: 0.25}} end={{x: 0.8, y: 0.5}}
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
          <TouchableOpacity
            onPress={() => {
              this.desloguearUsuario();
            }}
          >
            <Text
              style={{
                paddingHorizontal: 8,
                marginVertical: 10,
                marginLeft: 260,
                fontSize: 14,
                color: "#FFF",
              }}
            >
              {" "}
              Abandonar Sesión
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: 35,
              paddingTop: 40,
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            Bienvenido{" "}
            {this.state.perfil ? this.state.perfil.nombre : "Registrate"}!
          </Text>
          <Text
            style={{
              paddingHorizontal: 15,
              textAlign: "center",
              fontSize: 25,
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            ¿Que taller te gustaria hacer?
          </Text>
          <View style={{ height:100 }} />
        
        <ScrollView horizontal style={{ position:'absolute',
    bottom: -85}}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "red",
              marginTop: 15,
              marginHorizontal: 10,
              elevation: 7,
              borderRadius: 20,
              marginBottom: 16,
              paddingVertical: 30,
              paddingLeft: 30,
              width: 400,
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
                ¿Queres emprender?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Categorias")}
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
              width: 400,
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
              width: 400,
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
                onPress={() => this.props.navigation.navigate("Categorias")}
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

        <View style={{marginTop: 90}}
        >
          <Text style={{ textAlign: "center", fontSize: 22 }}>
            En ESPACIO TECNO podras
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
          >
            <Text style={{ color: "#eb0032" }}>descubrir,</Text>{" "}
            <Text style={{ color: "#3499c2" }}>capacitarte</Text>{" "}
            <Text style={{ color: "#a1b94b" }}>y emprender</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            Cada area cuenta con talleres y cursos para potenciar tu
            conocimiento.
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
                marginLeft: -4,
                borderRadius: 20,
                width: 120,
              }}
              onPress={() => this.props.navigation.navigate("Categorias")}
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
                marginHorizontal: 20,
                paddingVertical: 3,
                borderRadius: 10,
                width: 120,
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
                width: 120,
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
              fontSize: 24,
              marginTop: 23,
              paddingHorizontal: 20,
              paddingVertical:10,
              textAlign: "center",
              backgroundColor: '#d5e4d4'
            }}
          >
            Mira las <Text style={{fontWeight:'bold'}}>actividades por fecha</Text>
          </Text>
          <LinearGradient
        start={{x: 0.0, y: 0.25}} end={{x: 0.8, y: 0.5}}
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
         <Calendar
  // Handler which gets executed on day press. Default = undefined

  // Handler which gets executed on day long press. Default = undefined
  onDayPress={day => {
    console.log('selected day', day);
  }}
  minDate={'2022-03-10'}
  
  
  theme={{
    calendarBackground: 'transparent',
    todayTextColor: 'white',
    monthTextColor: 'white',
    dayTextColor: 'white',
    textMonthFontSize: 20,
    arrowColor: 'white',
    dotColor: 'white',
    todayTextColor: 'black',
    textDayHeaderFontSize: 20,
    textSectionTitleColor: 'white',
    textMonthFontWeight: 'bold',
    selectedDayTextColor: 'black',
    selectedDayBackgroundColor: 'black',
    selectedDotColor: 'white',
    selectedDotColor: 'blue',
    
  }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={month => {
    console.log('month changed', month);
  }}

  markedDates={{
    '2022-03-10': {selected: true, selectedColor: 'white'},

  }}
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
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false


  // Enable the option to swipe between months. Default = false
  enableSwipeMonths={true}
/>
        </LinearGradient>


        </View>

  
        
      </ScrollView>
    );
  }
}
