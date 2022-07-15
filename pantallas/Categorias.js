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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CategoriasList from "../componentes/CategoriasList";
import Loading from "./Loading";
import { BASE_URL, axiosLoggedInConfig } from "../api";
import { ModalDetallesCurso } from "../modals/ModalDetallesCurso";
import moment from "moment";
import { FontAwesome } from "react-native-vector-icons";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get("window");

export default class Cources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      modalVisible: false,
      selectCatg: "",
      modalLoading: false,
      modalHoras: false,
      dataModal: [],
      modalOk: false,
      multimedia: true,
      fabricacion: false,
      favoritos: false,
      modalConfirmado: false,
      minilab: false,
      horaseleccionada: "",
      ciencias: false,
      sonidos: false,
      modalHorarios: false,
      dataFechas: [],
      diasDictado: [],
      dia: [],
      modalConfirmadoCheck: false,
    };
  }

  componentDidMount() {
    const cursos = BASE_URL + "curso/";
    axiosLoggedInConfig().get(cursos).then((res) => {
      const cursos = res.data.filter((cat) => cat.categoria && cat.origen.id === 1);
      this.setState({ categorias: cursos });
      console.log(cursos);
    });
  }

  onClickAddModal(data, tipos) {
    this.setState({modalLoading: true, favoritos: false});
    const curso = BASE_URL + "fechasdictadobycursoid/?id_curso=" + data.id;
    axiosLoggedInConfig().get(curso).then((res) => {
      this.setState({dataFechas: res.data})
      console.log(this.state.dataFechas)
    
    if(tipos === "comun"){
    this.setState({
      modalOk: true,
      dataModal: data,
      modalLoading: false
    });
    }else{
      this.setState({
        modalVisible: true,
        dataModal: data,
        modalLoading: false
      });
    }
  });
  }

  onClickHora(fecha, id) {
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
    const numeroDia = new Date(fecha.dateString).getDay();
    const numeroMes = new Date(fecha.dateString).getMonth();
    const nombreDia = dias[numeroDia];
    const nombreMes = monthNames[numeroMes];
    const traduccion = {
      dia: nombreDia,
      mes: nombreMes,
      numero: fecha.day,
      year: fecha.year
    };
    this.setState({modalLoading: true, favoritos: false, dia: traduccion});
    const curso = BASE_URL + "horarioscursobyfechaandcursoid/?id_curso=" + id + "&fecha=" + fecha.dateString;
    axiosLoggedInConfig().get(curso).then((res) => {
      this.setState({diasDictado: res.data})
      console.log(this.state.diasDictado)
      this.setState({ modalVisible: false, modalHorarios: true, modalLoading: false })
  });
  }

  onClickRegistrado() {
    const curso = BASE_URL + "inscripto/";
    const comisionid = this.state.selectCatg;
    console.log(comisionid);
    axiosLoggedInConfig().post(curso, {comision: comisionid}).then((res) => {
      console.log(res.data);
      this.setState({ modalHorarios: false, modalConfirmadoCheck: true })

  }).catch((err)=>{
    Alert.alert('Ey! Ya estas inscripto', 'Ups, no te pudimos volver a inscribir ya que te inscribiste anteriormente')
  })
  }

  addFavorite() {
    const item = this.state.dataModal;
    AsyncStorage.getItem('favoritos').then((datafavoritos)=>{
      if (datafavoritos !== null) {
        // We have data!!
        
        const cart = JSON.parse(datafavoritos);
        const buscar = cart.find(o => o.id === item.id);
        if(buscar){
          Alert.alert('¡Atencion!', 'Este curso fue guardado con anterioridad');
        } else {
        cart.push(item)
        AsyncStorage.setItem('favoritos',JSON.stringify(cart));
        this.setState({ favoritos: true })
        Alert.alert('¡Curso guardado!', 'Puedes encontrarlo en tu perfil, en la seccion de favoritos');
        }
      }
      else{
        const cart  = []
        cart.push(item)
        AsyncStorage.setItem('favoritos',JSON.stringify(cart));
        this.setState({ favoritos: true })
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  

  render() {
    var today = new Date();
    const fecha = moment(today).format("YYYY-MM-DD");
    let markedDatesArray = {};
this.state.dataFechas.forEach((val) => {
  markedDatesArray[val] = { selected: true, selectedColor: "#00789d", disableTouchEvent: false };
});




    return (
      <ImageBackground
        source={require("../assets/FONDO-DESCUBRIR.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView  contentContainerStyle={{ flexGrow: 1,}}>
        {/* CONFIRMACION */}

        <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalLoading}
      >
        <View style={{flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",}}>
        <Loading/></View>
      </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalConfirmadoCheck}
        onRequestClose={() => {
          this.setState({modalConfirmadoCheck: false});
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
          source={require("../assets/fondo-inscripcion.png")}
          imageStyle={{ borderRadius: 20}}
          style={{ resizeMode: "stretch", width: width-40, borderRadius: 20}}
        >
          <Image
                source={{
                  uri: this.state.dataModal.picture
                  ? this.state.dataModal.picture
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
              {this.state.dataModal.nombre}
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
              <Text style={{fontWeight: 'bold'}}>{this.state.dia.dia} {this.state.dia.numero} de {this.state.dia.mes}</Text> de {this.state.dia.year}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                color: '#282828',
                marginHorizontal: 20,
              }}
            >
              Turno {this.state.horaseleccionada > '09:00:00' && this.state.horaseleccionada < '13:00:00' ? 'mañana' : 'tarde'
              } | <Text style={{fontWeight: 'bold'}}>{moment(this.state.horaseleccionada, "H:mm:ss").format("HH:mm")}Hs</Text>
            </Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  this.setState({ modalConfirmadoCheck: false })
                }
              >
                <Text style={styles.textStyle}>{"< "}VOLVER</Text>
              </Pressable>
          </View>
        </View>
      </Modal>


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalConfirmado}
          onRequestClose={() => {
            this.setState({ modalConfirmado: false });
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
                  fontSize: (width / 15)-2,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}
              >{this.state.dataModal.nombre}
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
                  this.setState({ modalConfirmado: false })
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
          visible={this.state.modalOk}
          onRequestClose={() => {
            this.setState({ modalOk: false });
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}><TouchableOpacity onPress={() => {
            this.addFavorite();
          }} style={{position: 'absolute', right: 10, top: 10, backgroundColor: 'white', borderRadius: 30, padding: 5, justifyContent: 'center', alignItems: 'center'}}><FontAwesome
        name={this.state.favoritos ? 'heart' : 'heart-o'}
        color={this.state.favoritos ? 'red' : 'black'}
        size={30}
      /></TouchableOpacity>
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
                  fontSize: (width / 15)-2,
                  marginHorizontal: 20,
                  marginTop: 8,
                  fontWeight: "bold",
                }}
              >{this.state.dataModal.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  color: 'gray',
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
            this.setState({ modalHorarios: false });
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
              >{this.state.dataModal.nombre}
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
              >{this.state.diasDictado.find((cat) => cat.dia_comision.horario_inicio > '09:00:00' && cat.dia_comision.horario_inicio < '13:00:00') && (
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
                  {this.state.diasDictado.filter((cat) => cat.dia_comision.horario_inicio > '09:00:00' && cat.dia_comision.horario_inicio < '13:00:00').map((item, i) => {
                  return (
                  <TouchableOpacity
                    onPress={() => this.setState({ selectCatg: item.comision_id, horaseleccionada: item.dia_comision.horario_inicio })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          this.state.selectCatg === item.comision_id
                            ? "#0088c2"
                            : "transparent",
                        color: this.state.selectCatg === item.comision_id ? "white" : "gray",
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
                  <View style={{ borderWidth: 0.3, borderColor: "black" }} />
                  {this.state.diasDictado.find((cat) => cat.dia_comision.horario_inicio > '12:59:00' && cat.dia_comision.horario_inicio < '23:59:00') && (
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
                  {this.state.diasDictado.filter((cat) => cat.dia_comision.horario_inicio > '12:59:00' && cat.dia_comision.horario_inicio < '23:59:00').map((item, i) => {
                  return (
                  <TouchableOpacity
                    onPress={() => this.setState({ selectCatg: item.comision_id, horaseleccionada: item.dia_comision.horario_inicio })}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        backgroundColor:
                          this.state.selectCatg === item.comision_id
                            ? "#0088c2"
                            : "transparent",
                        color: this.state.selectCatg === item.comision_id ? "white" : "gray",
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
                style={[styles.button, styles.buttonClose, {backgroundColor:
                  this.state.selectCatg ? "#0086bf" : "rgba(0, 0, 0, 0.15)"}]}
                onPress={() => this.onClickRegistrado()}
                disabled={this.state.selectCatg ? false : true}
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
              >{this.state.dataModal.nombre}
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
                 this.onClickHora(day, this.state.dataModal.id)
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
                markedDates={markedDatesArray}
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
          animationType="slide"
          transparent={true}
          visible={this.state.modalHoras}
          onRequestClose={() => {
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
              >Arduino + bloques
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
            width: scale(200),
            height: scale(130),
            alignSelf: "center",
            marginVertical: 14
          }}
        />

        <View
          style={{
            borderTopLeftRadius: 60,
            borderTopRightRadius: 60,
            backgroundColor: 'white',flex: 1,
            marginBottom: 0
          }}
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
                .filter((cat) => cat.categoria.id === 1)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPressComun={() => this.onClickAddModal(item, 'comun')}
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
                .filter((cat) => cat.categoria.id === 2)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPressComun={() => this.onClickAddModal(item, 'comun')}
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
                .filter((cat) => cat.categoria.id === 3)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPressComun={() => this.onClickAddModal(item, 'comun')}
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
                .filter((cat) => cat.categoria.id ===  4)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPressComun={() => this.onClickAddModal(item, 'comun')}
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
                .filter((cat) => cat.categoria.id === 5)
                .map((item, i) => {
                  return (
                    <CourseList
                      id={i}
                      onPressComun={() => this.onClickAddModal(item, 'comun')}
                      onPress={() => this.onClickAddModal(item)}
                      img={item.picture}
                      title={item.nombre}
                      bg="#fdddf3"
                    />
                  );
                })}
            </View>
          </View>
        </View>
        </ScrollView>
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
