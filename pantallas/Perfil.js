import { View, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Feather, FontAwesome } from "react-native-vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

export default function Perfil({navigation}) {

  const [date, setDate] = useState(new Date(1598051730000));

  const [mode, setMode] = useState('date');

  const [show, setShow] = useState(false);

  const [dateInput, setDateInput] = useState(new Date())

  const [textCumpleanios, setTextCumpleanios] = useState("")

  const [ocultar_cursos_state, set_ocultar_cursos_state] = useState(false)

  const [mensaje_cursos, set_mensaje_cursos] = useState("Mostrar todos los cursos")

  const onChange = (event, selectedDate) => {
    if (selectedDate != null) {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setDateInput(selectedDate)
      setTextCumpleanios(dateInput.getDate() + "/" + dateInput.getMonth() + "/" + dateInput.getUTCFullYear())
    }
    else {
      setTextCumpleanios(" / / ");
      setShow(false)
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const cambiarMensajeCursos = () => {
    set_ocultar_cursos_state(!ocultar_cursos_state)
    ocultar_cursos_state ? set_mensaje_cursos("Ocultar todos los cursos") : set_mensaje_cursos("Mostrar todos los cursos")
  }


  const perfilData = 
    {
      nombre: "test",
      apellido: "asdasd",
      documento: "34634",
      avatar: require('../assets/image1.png'),
      cumpleanios: "30/03/2001",
    }
  ;

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user" size={24} />
        <Text style={styles.title_perfil}>Perfil</Text>
        <FontAwesome name="user" size={24} />

    </View>
      <View>
        <TouchableOpacity style={styles.edit_icon}>
          <Feather name="edit" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View>




              <View style={styles.profile_content}>
                <Image
                  source={perfilData.avatar}
                  style={styles.profile_image} />
              </View>

              <Text style={styles.text_label}> Nombre y Apellido</Text>

              <Text style={styles.input_text}>{perfilData.nombre}</Text>

              <Text style={styles.text_label}> Documento</Text>

              <Text style={styles.input_text}>{perfilData.documento}</Text>

              <TouchableOpacity onPress={showDatepicker}><Text>Cumpleaños</Text>

              </TouchableOpacity><Text style={styles.input_text}>{perfilData.cumpleanios}</Text> 
        </View>
        <View style={{paddingVertical: 5}}>
        <TouchableOpacity style={styles.button_mostrar_cursos} onPress={cambiarMensajeCursos}><Text>{mensaje_cursos}</Text></TouchableOpacity>
        <Button title="Favoritos" onPress={() => navigation.navigate('Mis Cursos')}></Button>
        <Button title="Mis Cursos"></Button>
      </View>
      </ScrollView>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

     

    </View>

  )


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header_warpper: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  title_perfil: {
    textAlign: 'center',
    fontSize: 24,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  },
  profile_content: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30
  },
  text_label: {
    fontSize: 15,
    lineHeight: 17.7,
    fontStyle: "normal"
  },
  input_text: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24.51,
    fontStyle: "normal",
    left: 60
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  edit_icon: {
    alignItems: "flex-end",
    paddingRight: 50
  },
  button_mostrar_cursos: {
    backgroundColor: "#90C641",
    padding: 10,
    borderRadius: 12,
    alignItems: "center"
  },
  button_font: {
    fontFamily: "notoserif",
    fontSize: 16,
    fontWeight: "bold"
  }

});