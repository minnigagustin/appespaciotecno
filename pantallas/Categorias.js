import React from "react";
import {
<<<<<<< HEAD
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "./CourseList";
import axios from "axios";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CategoriasList from "../pantallas/CategoriasList";
=======
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground} from 'react-native'
import {Modalize} from 'react-native-modalize'
import CourseList from "../componentes/CourseList"
import axios from "axios";
import CategoriasList from '../componentes/CategoriasList'
>>>>>>> 0d02757f7bc5cdfe0f51e4a2268b53bdd5c0bc68
import { BASE_URL } from "../api";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default class Cources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      modalVisible: false,
      modalHoras: false,
    };
  }

  componentDidMount() {
    const cursos = BASE_URL + "curso/";
    axios.get(cursos).then((res) => {
      const cursos = res.data;
      this.setState({ categorias: cursos });
      console.log(cursos);
    });
  }

  render() {
    var today = new Date();
    const fecha = moment(today).format("YYYY-MM-DD");
    console.log(fecha);
    const markedDatesArray = {
      [fecha]: { selected: true, selectedColor: "#00789d" },
    };

    return (
      <ImageBackground
        source={require("../assets/FONDO-DESCUBRIR.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ modalVisible: false });
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
                Taller de {"\n"} Arduino + bloques
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
                markedDates={markedDatesArray}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalHoras}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ modalHoras: false });
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
                Taller de {"\n"} Arduino + bloques
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
                markedDates={markedDatesArray}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({ modalH: false })}
              >
                <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Image
          source={require("../assets/DESCUBRIR-VERTICAL-01.png")}
          resizeMode="contain"
          style={{
            width: 300,
            height: 500,
            alignSelf: "center",
            top: -130,
          }}
        />

        <Modalize
          handleStyle={{
            backgroundColor: "#e9e9e9",
            width: 80,
          }}
          modalStyle={{
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
          }}
          alwaysOpen={450}
          scrollViewProps={{ showsVerticalScrollIndicator: false }}
        >
          <View style={{ paddingVertical: 30 }}>
            <CategoriasList
              onPress={() => this.props.navigation.navigate("Perfil")}
              img={require("../assets/fondo-multimedia.png")}
              title="MULTIMEDIA"
              bg="#fdddf3"
              activado
            />
            {this.state.categorias.map((item, i) => {
              return (
                <CourseList
                  id={i}
                  onPress={() => this.setState({ modalVisible: true })}
                  img={item.picture}
                  title={item.nombre}
                  bg="#fdddf3"
                />
              );
            })}

            <CategoriasList
              onPress={() => this.setState({ modalVisible: true })}
              img={require("../assets/fondo-fabricacion.png")}
              title="FABRICACIÓN"
              bg="#fdddf3"
            />

            <CategoriasList
              onPress={() => this.setState({ modalVisible: true })}
              img={require("../assets/fondo-minilab.png")}
              title="MINILAB"
              bg="#fdddf3"
            />

            <CategoriasList
              onPress={() => this.setState({ modalVisible: true })}
              img={require("../assets/fondo-ciencia.png")}
              title="CIENCIAS"
              bg="#fdddf3"
            />

            <CategoriasList
              onPress={() => this.setState({ modalVisible: true })}
              img={require("../assets/fondo-sonidos.png")}
              title="SONIDOS"
              bg="#fdddf3"
            />
          </View>
        </Modalize>
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
