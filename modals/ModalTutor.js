import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable, Image, Alert, Button, ToastAndroid } from "react-native";
import { FontAwesome } from "react-native-vector-icons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { TextInput } from "react-native-paper";
const { width, height } = Dimensions.get("window");

export const ModalTutor = (props) => {
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
              <Text  style={{fontSize: width * 0.04}}>Debes ingresar el <Text style={{fontWeight: 'bold'}}>email de tu madre/padre o tutor</Text> para validar tus datos.</Text>
              <TextInput placeholder="Email | tutor@bahia.gob.ar..." mode="outline" style={{width: width * 0.8, marginVertical: 8}} activeUnderlineColor={'#017185'}/>
              <TouchableOpacity
              style={[
                styles.ingresar_style,
                {
                  backgroundColor: "#017185" ,
                },
              ]}
              onPress={() => {  ToastAndroid.show('Se envio un email a su tutor.', ToastAndroid.SHORT); props.salir(false) }}
            >
              <Text style={styles.ingresar_text}>INGRESAR</Text>
            </TouchableOpacity>
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
  ingresar_style: {
    borderRadius: 30,
    marginTop: 8,
    borderColor: "black",
    paddingVertical: 6,
    paddingHorizontal: 48,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    alignSelf: "center",
  },
  ingresar_text: {
    fontSize: width / 22,
    color: "white",
    marginVertical: 7,
    marginHorizontal: 7,
  },
  input_style: {
    alignSelf: "center",
    alignItems: "stretch",
    fontSize: width / 22,
    marginBottom: 20,
    borderRadius: 30,
    borderColor: "#90C641",
    width: width / 1.25,
    padding: 2,
    backgroundColor: "#a1b94b",
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
