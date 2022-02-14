
import { View, Text, StyleSheet, FlatList } from "react-native";
import {FontAwesome} from "react-native-vector-icons";
import React from 'react';
import Curso from '../componentes/curso';


  const misCursosData = [
    {
      nombre: "Python",
      subtitulo: "de junior a senior",
      fecha: "Del 27/01 al 30/03",
    },
    {
      nombre: "React",
      subtitulo: "Probando",
      fecha: "Del 13/01 al 20/03 - Ultimos días",
    },
    {
      nombre: "Go",
      subtitulo: "de junior a senior",
      fecha: "Del 03/04 al 24/05",
    },
    { nombre: "HTML", subtitulo: "de junior a senior" },
    {
      nombre: "React Native",
      subtitulo: "Probando",
      fecha: "Del 13/01 al 20/03 - Ultimos días",
    },
  ];


export default function MisCursos() {
  
  return (

    <View>

      <View style={styles.header}>
        <FontAwesome name="book" size={24} />
        <Text style={styles.title_perfil}>Mis Cursos</Text>
        <FontAwesome name="book" size={24} />
      </View>

      <FlatList
        data = {misCursosData}
        renderItem={({item}) =>
         <Curso nombre={item.nombre}
                subtitulo={item.subtitulo}
                fecha={item.fecha} 
          />}
        keyExtractor={item => item.nombre}
      />

    </View>

  )

}


const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title_perfil: {
    textAlign: 'center',
    fontSize: 24,
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10
  }
});
