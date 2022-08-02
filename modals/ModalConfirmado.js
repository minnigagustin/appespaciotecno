import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Image, Alert, ImageBackground } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
const { width, height } = Dimensions.get("window");

export const ModalConfirmadoComponent = (props) => {
  const navigation = useNavigation();
  const [favoritos, setFavoritos] = useState(false);

  const addFavorite = () => {
    const item = props.data;
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
        setFavoritos(true);
        Alert.alert('¡Curso guardado!', 'Puedes encontrarlo en tu perfil, en la seccion de favoritos');
        }
      }
      else{
        const cart  = []
        cart.push(item)
        AsyncStorage.setItem('favoritos',JSON.stringify(cart));
        setFavoritos(true);
      }
    })
    .catch((err)=>{
      alert(err)
    })
  }

  const img = "https://i0.wp.com/imagenesparapeques.com/wp-content/uploads/2021/05/ROBLOX-CLIPARTS-8.png?ssl=1";
 

  return (
    <Modal
    isVisible={props.visibilidad}
    animationIn="bounceInUp"
            animationOut="slideOutRight"
            backdropTransitionOutTiming={0}
            onBackdropPress={() => {
              props.siguiente(false);
            }}
        onRequestClose={() => {
          props.siguiente(false);
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
                  uri: props.data.picture
                  ? 'https://tecnotest.bahia.gob.ar/' + props.data.picture
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
              {props.data.nombre}
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
              <Text style={{fontWeight: 'bold'}}>{props.dia.dia} {props.dia.numero} de {props.dia.mes}</Text> de {props.dia.year}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: width / 20,
                color: '#282828',
                marginHorizontal: 20,
              }}
            >
              Turno {props.horaseleccionada > '09:00:00' && props.horaseleccionada < '13:00:00' ? 'mañana' : 'tarde'
              } | <Text style={{fontWeight: 'bold'}}>{moment(props.horaseleccionada, "H:mm:ss").format("HH:mm")}Hs</Text>
            </Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  props.siguiente(false)
                }
              >
                <Text style={styles.textStyle}>{"< "}VOLVER</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
  );
};

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
