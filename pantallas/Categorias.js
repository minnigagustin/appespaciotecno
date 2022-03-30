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
  ImageBackground,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "../componentes/CourseList";
import axios from "axios";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CategoriasList from "../componentes/CategoriasList";
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
        source={require("../assets/FONDO-DESCUBRIR.jpg")}
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
          source={require("../assets/DESCUBRIR-VERTICAL-01.png")}
          resizeMode="contain"
          style={{
            width: width / 1.5,
            height: width / 0.8,
            alignSelf: "center",
            top: -(width / 3.4),
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
              onPress={() =>
                this.setState({ multimedia: !this.state.multimedia })
              }
              img={require("../assets/fondo-multimedia.png")}
              title="MULTIMEDIA"
              bg="#FFFFFF"
              activado={this.state.multimedia}
            />
            <View style={{ display: this.state.multimedia ? "flex" : "none" }}>
              {this.state.categorias
                .filter((cat) => cat.categoria === 1)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>
            <CategoriasList
              onPress={() =>
                this.setState({ fabricacion: !this.state.fabricacion })
              }
              img={require("../assets/fondo-fabricacion.png")}
              title="FABRICACIÓN"
              bg="#F3D64D"
              activado={this.state.fabricacion}
            />
            <View style={{ display: this.state.fabricacion ? "flex" : "none" }}>
              {this.state.categorias
                .filter((cat) => cat.categoria === 2)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>

            <CategoriasList
              onPress={() => this.setState({ minilab: !this.state.minilab })}
              img={require("../assets/fondo-minilab.png")}
              title="MINILAB"
              bg="#7E4487"
              activado={this.state.minilab}
            />
            <View style={{ display: this.state.minilab ? "flex" : "none" }}>
              {this.state.categorias
                .filter((cat) => cat.categoria === 3)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>

            <CategoriasList
              onPress={() => this.setState({ ciencias: !this.state.ciencias })}
              img={require("../assets/fondo-ciencia.png")}
              title="CIENCIAS"
              bg="#F2D94B"
              activado={this.state.ciencias}
            />
            <View style={{ display: this.state.ciencias ? "flex" : "none" }}>
              {this.state.categorias
                .filter((cat) => cat.categoria === 4)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>

            <CategoriasList
              onPress={() => this.setState({ sonidos: !this.state.sonidos })}
              img={require("../assets/fondo-sonidos.png")}
              title="SONIDOS"
              bg="#E2004B"
              activado={this.state.sonidos}
            />
            <View style={{ display: this.state.sonidos ? "flex" : "none" }}>
              {this.state.categorias
                .filter((cat) => cat.categoria === 5)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>
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
