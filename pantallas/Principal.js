import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
} from "react-native";
import Curso from "../componentes/curso";
import { FontAwesome } from "react-native-vector-icons";


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function App() {
  const mapeado = [
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
  let [filteredData, setFilteredData] = useState(mapeado);

  const getMovies = async () => {
    try {
     const response = await fetch('https://reactnative.dev/movies.json');
     const json = await response.json();
     console.log(json.movies);
   } catch (error) {
     console.error(error);
   } finally {
   }
 }

 useEffect(() => {
   getMovies();
 }, []);

  function _searchFilterFunction(searchText, data) {
    let newData = [];
    if (searchText) {
      newData = data.filter(function(item) {
        const itemData = item.nombre.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredData([...newData]);
    } else {
      setFilteredData([...data]);
    }
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width / 1.3,
          borderRadius: 3,
          top: 10,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center", zIndex: 1,
          height: 50,
          backgroundColor: "#FFFFFF",
        }}
      >
        <FontAwesome
          name="list"
          size={25}
          color="#90C641"
          style={{ left: 10, position: "absolute" }}
        />
       
          <TextInput
     style={{
      width: width / 1.8,
      borderRadius: 3,
      height: 40,
      padding: 10,
      backgroundColor: "#F5F5F5",
    }}
    onChangeText={(value) => {
      _searchFilterFunction(value, mapeado);
    }}

        placeholder="Buscar..."
      />
          
       
        <FontAwesome
          name="search"
          size={25}
          color="#90C641"
          style={{ right: 10, position: "absolute" }}
        />
      </View>

      <ScrollView>
        {filteredData.map((item) => (
          <Curso
            nombre={item.nombre}
            subtitulo={item.subtitulo}
            descripcion={item.descripcion}
            fecha={item.fecha}
          />
        ))}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
