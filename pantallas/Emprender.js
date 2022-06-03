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

  componentDidMount() {
    const cursos = BASE_URL + "curso/";
    axios.get(cursos).then((res) => {
      const cursos = res.data;
      this.setState({ categorias: cursos });
      console.log(cursos);
    });
  }

  onClickAddModal(data) {
    this.setState({
      modalOk: true,
      dataModal: data,
    });
  }

  render() {
    var today = new Date();
    const fecha = moment(today).format("YYYY-MM-DD");
    const markedDatesArray = {
      [fecha]: { selected: true, selectedColor: "#00789d" },
    };

    return (
      <ImageBackground
        source={require("../assets/EMPRENDER-FONDO.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalOk}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ modalOk: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
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
                  fontSize: width / 15,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}
              >
                Taller de {"\n"} {this.state.dataModal.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalHorarios}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setState({ modalHorarios: false });
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
                Taller de {"\n"} {this.state.dataModal.nombre}
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
                    onPress={() => this.setState({ selectCatg: 1 })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          this.state.selectCatg === 1
                            ? "#0088c2"
                            : "transparent",
                        color: this.state.selectCatg === 1 ? "white" : "gray",
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
                    onPress={() => this.setState({ selectCatg: 2 })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        color: this.state.selectCatg === 2 ? "white" : "gray",
                        backgroundColor:
                          this.state.selectCatg === 2
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
                    onPress={() => this.setState({ selectCatg: 3 })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          this.state.selectCatg === 3
                            ? "#0088c2"
                            : "transparent",
                        color: this.state.selectCatg === 3 ? "white" : "gray",
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
                    onPress={() => this.setState({ selectCatg: 4 })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        color: this.state.selectCatg === 4 ? "white" : "gray",
                        backgroundColor:
                          this.state.selectCatg === 4
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
                onPress={() => this.setState({ modalHorarios: false })}
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

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
                Taller de {"\n"} {this.state.dataModal.nombre}
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
                onPress={() =>
                  this.setState({ modalVisible: false, modalHorarios: true })
                }
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
          source={require("../assets/EMPRENDER-CABEZAL.png")}
          resizeMode="contain"
          style={{
            width: width / 1.5,
            height: width / 2,
            alignSelf: "center",
            top: 30,
          }}
        />

<Text style={{marginTop:30, width: width/1.2, color: 'white', fontSize: width/20, textAlign: 'center', alignSelf: 'center'}}>Un espacio donde la ciudadanía, organizaciones, emprendedores y el gobierno nos encontramos para <Text style={{fontWeight: 'bold'}}>pensar ideas creativas para diseñar y construir a Bahía como ciudad del conocimiento, la innovación y las tecnologías.</Text> </Text>

<Text style={{marginTop:30, width: width/1.38, color: 'black',fontWeight: 'bold', fontSize: width/20, textAlign: 'center', alignSelf: 'center'}}>Te invitamos a descubrir cómo este espacio de vinculación, puede potenciar tu emprendimiento.</Text>
<View style={{position: 'absolute', bottom: 20, width: width}}>

<CategoriasList
              onPress={() => Linking.openURL('https://espaciotecno.bahia.gob.ar/#emprender')}
              img={require("../assets/fondo-emprender.png")}
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
