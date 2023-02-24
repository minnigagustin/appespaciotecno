import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Image, Alert } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
const { width, height } = Dimensions.get("window");

export const ModalDetallesCurso = (props) => {
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
                props.salir(false);
              }}
          onRequestClose={() => {
            props.salir(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => {
            addFavorite();
          }} style={{position: 'absolute', right: 10, top: 10, backgroundColor: 'white', borderRadius: 30, padding: 5, justifyContent: 'center', alignItems: 'center'}}><FontAwesome
        name={favoritos ? 'heart' : 'heart-o'}
        color={favoritos ? 'red' : 'black'}
        size={30}
      /></TouchableOpacity>
              <Image
                source={{
                  uri: props.data.picture
                    ? 'https://espaciotecnoapi.bahia.gob.ar/' + props.data.picture
                    : "http://espaciotecno.com.ar/img/espacio-tecno-bahia-blanca.png",
                }}
                style={{ width: width/4, height: width/4, borderRadius: 10 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: (width / 17)-2,
                  marginHorizontal: 20,
                  marginTop: 0,
                  fontWeight: "bold",
                }}
              >{props.data.nombre}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: width / 23,
                  marginHorizontal: 20,
                  marginTop: 5,
                }}
              >
                {props.data.descripcion}
              </Text>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={props.siguiente}
              >
                <Text style={styles.textStyle}>INSCRIBIRME {">"}</Text>
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
