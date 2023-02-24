import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Pressable, Dimensions, TouchableOpacity, Animated, Image } from "react-native";
import Modal from "react-native-modal";
import { BarCodeScanner } from "expo-barcode-scanner";
import { BASE_URL, axiosLoggedInConfig } from "../api";
import {ModalDetallesCurso} from "../modals/ModalDetallesCurso";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ModalConfirmadoComponent} from "../modals/ModalConfirmado";
import CourseList from "../componentes/CoursePrincipal";
import moment from "moment";
import Loading from "./Loading";
import { Calendar, CalendarUtils, LocaleConfig } from "react-native-calendars";
import QRCode from 'react-native-qrcode-svg';
import { set } from "react-native-reanimated";


const { width, height } = Dimensions.get("window");


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrmodal, setQr] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [dataCurso, setData] = useState([]);
  const [cursosfechas, setCursosFechas] = useState([]);
  const [modalHorarios, setModalHorarios] = useState(false);
  const [modalEaster, setModalEaster] = useState(false);
  const [dataFechas, setDataFechas] = useState([]);
  const [diasdictado, setDiasDictado] = useState([]);
  const [modalcurso, setModalCurso] = useState(false);
  const [modalConfirmado, setModalConfirmado] = useState(false);
  const [modalFechas, setModalFechas] = useState(false);
  const [dni, setDni] = useState("");
  const [catg, setCatg] = useState(0);
  const [horaseleccionada, sethoraseleccionada] = useState('')
  const [dia, setDia] = useState([]);

  const [selectHorario, setSelectHorario] = useState(0)

  const [animationLineHeight, setAnimationLineHeight] = useState(0)
  const [focusLineAnimation, setFocusLineAnimation] = useState(
    new Animated.Value(0),
  )


  useEffect(() => {
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        const perfilparse = JSON.parse(perfil);
        setDni(perfilparse.numero_documento)
      } else {
      }
    });
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    animateLine()
  }, []);

  const animateLine = () => {
    Animated.sequence([
      Animated.timing(focusLineAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }), Animated.timing(focusLineAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start(animateLine)
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    if(data.split('/')[3] === 'curso') {
    const curso = BASE_URL + "infocursobycursoid/?id_curso=" + data.split('/')[4];
    axiosLoggedInConfig().get(curso).then((res) => {
      console.log(res.data.curso);
      setData(res.data.curso);
      setModalCurso(true);
        const cursofecha = BASE_URL + "fechasdictadobycursoid/?id_curso=" + data.split('/')[4];
      axiosLoggedInConfig().get(cursofecha).then((res) => {
        setDataFechas(res.data);
        console.log(res.data)
    });
  }).catch((err)=>{
    
    Alert.alert('Ey! No encontramos el curso', 'Asegurate de estar escaneando un QR valido');
    setScanned(false);
  });
  
} else if(data === 'eastereggsistemas') {
  setModalEaster(true);
} else if(data.split('/')[3] === 'presente') {
  handleSubmit();
} else {
  Alert.alert('Ey! No encontramos el curso', 'Asegurate de estar escaneando un QR valido');
    setScanned(false);
}
  };

  const handleSubmit = () => {
    const cursofecha = BASE_URL + "diascomisionbyalumnotoday/";
    axiosLoggedInConfig().post(cursofecha, {documento: dni}).then((res) => {
      control(res.data);
  }).catch((err)=>{
    console.log(err);
    Alert.alert('Ey!', 'No tienes cursos registrados para hoy, intenta mas tarde');
    setScanned(false);
  });

  };

  const control = (resp) => {
    if (resp.length > 0) {
      console.log(resp);
        setCursosFechas(resp);
        setModal(true);
    } else {
      Alert.alert('Ups!', 'Ocurrio un error, lo estamos solucionando');
      setScanned(false);
    }
  };

  const handleClick = () => {

    const arraydni = [];
    arraydni.push(dni);
    axiosLoggedInConfig().post(
      BASE_URL + "asistencia/",
      {dia_comision : dataCurso.id, documentos: JSON.stringify(arraydni)}
    ).then((resp) => {
  
    if (resp != null) {
      if (resp.status === 200) {
        if (resp.data.validadas.length === 0) {
          Alert.alert('Ups!', 'Ya habias confirmado la asistencia anteriormente')
          setScanned(false);
        } else {
          Alert.alert('Genial!', 'Gracias por confirmar tu asistencia')
          setScanned(false);

        }

      } else {
        console.log('error en handleclick')
      }
    }
  }).catch((err)=>{
    console.log(err);
    Alert.alert('Ey! No encontramos el curso', 'Asegurate de estar escaneando un QR valido');
    setScanned(false);
  });
    setModal(false);
  };
  



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
    console.log(traduccion)
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


  let markedDatesCursosArray = {};
dataFechas.forEach((val) => {
  markedDatesCursosArray[val] = { selected: true, selectedColor: "#00789d", disableTouchEvent: false };
});

  return (
    <View style={styles.container}>
      <Loading visible={modalLoading}/>
      <Modal
        isVisible={modal}
        animationIn="bounceInUp"
        animationOut="slideOutRight"
        backdropTransitionOutTiming={0}
        onBackdropPress={() => {
          setModal(false);
          setScanned(false);

        }}
    onRequestClose={() => {
      setModal(false);
      setScanned(false);
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
                      setData(item);
                    }}
                    img={'https://espaciotecnoapi.bahia.gob.ar/' + item.comision.curso.picture}
                    title={item.comision.curso.nombre}
                    categoria={item.comision.curso.categoria}
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
                handleClick();
              }}
              disabled={catg === 0 ? true : false}
            >
              <Text style={styles.textStyle}>SIGUIENTE {">"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal isVisible={modalEaster}
      animationIn="bounceInUp"
              animationOut="slideOutRight"
              backdropTransitionOutTiming={0}
              onBackdropPress={() => {
                setModalEaster(false);
                setScanned(false);

              }}
          onRequestClose={() => {
            setModalEaster(false);
            setScanned(false);
          }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
          <Text style={{
                  textAlign: "center",
                  fontSize: (width / 17)-2,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}>¿No podes hacerlo vos?</Text>
          <Image
                source={{
                  uri: 'https://i.pinimg.com/originals/97/b2/e6/97b2e6934ac45ce601ec4787278fdf7d.png',
                }}
                style={{ width: width/3, height: width/3, borderRadius: 10 }}
              />
        </View>
        </View>
      </Modal>
      <ModalDetallesCurso data={dataCurso} visibilidad={modalcurso} salir={() => {setModalCurso(false), setScanned(false)}} siguiente={() => {setModalCurso(false), setScanned(false), setModalFechas(true);}} />
      <ModalConfirmadoComponent visibilidad={modalConfirmado} data={dataCurso} dia={dia} horaseleccionada={horaseleccionada}   siguiente={() => {setModalConfirmado(false), setScanned(false)}} />

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
              >{dataCurso.nombre}
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
                  onClickHoraModal(day, dataCurso.id)
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
              >{dataCurso.nombre}
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
              >{diasdictado.find((cat) => cat.dia_comision.horario_inicio > '09:00:00' && cat.dia_comision.horario_inicio < '13:00:00') && (
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
                  {diasdictado.filter((cat) => cat.dia_comision.horario_inicio > '09:00:00' && cat.dia_comision.horario_inicio < '13:00:00').map((item, i) => {
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
                  <View style={{ borderWidth: 0.3, borderColor: "black" }} />
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
        isVisible={qrmodal}
        animationIn="bounceInUp"
                animationOut="slideOutRight"
                backdropTransitionOutTiming={0}
                onBackdropPress={() => {
                  setQr(false);
                }}
    
        onRequestClose={() => {
          Alert.alert("Qr Cerrado");
          setQr(!qrmodal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <QRCode
      value="https://www.bahia.gob.ar/"
      size={260}
    />
    <Text style={{fontSize: 20}}>https://www.bahia.gob.ar/</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setQr(!qrmodal)}
            >
              <Text style={styles.textStyle}>Salir!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: 1000, height: 1000, alignSelf: 'center' }}
        barCodeTypes={[
          BarCodeScanner.Constants.BarCodeType.qr
        ]}
      />
      <View style={styles.overlay}>
                  <View style={styles.unfocusedContainer}></View>
                  <View style={styles.middleContainer}>
                    <View style={styles.unfocusedContainer}></View><View
                      onLayout={e => setAnimationLineHeight(e.nativeEvent.layout.height)}
                      style={styles.focusedContainer}>
                      {!scanned && (
                        <Animated.View
                          style={[
                            styles.animationLineStyle,
                            {
                              transform: [
                                {
                                  translateY: focusLineAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, animationLineHeight],
                                  }),
                                },
                              ],
                            },
                          ]}
                        />
                      )}
                    </View><View style={styles.unfocusedContainer}></View></View><View style={styles.unfocusedContainer}></View></View>
      {scanned === true && (
        <Button title={"Presiona para escanear nuevamente"} onPress={() => setScanned(false)} />
      )}
      {/* <View style={{position: 'absolute', bottom: 20, left: 0, right: 0}}>
      <Button title={"Ver QR"} onPress={() => setQr(true)} />
      </View> */}
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  absoluteFillObject: {
        left: 0,
        height: 800,
        right: 0,
        top: 0,
        bottom: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    textAlign: "center"
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, }, unfocusedContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', }, middleContainer: { flexDirection: 'row', flex: 1.5, }, focusedContainer: { flex: 9, }, animationLineStyle: {
    height: 4, width: '100%', backgroundColor: 'red',
    elevation:20,
    color: 'red'
  }, rescanIconContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', },
});
