
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import React, { useState } from 'react';

export default function AvanceCursos(props) {

  const avanceData = 
    {
      nombre: "React",
      imagen: require('../assets/image1.png'),
      descripcion: "34634",
      nro_clases: 3
    };

  return (
  
    <View>

      <View>
        <Text>{avanceData.nombre}</Text>
      </View>

      <View>
        <Image source={avanceData.imagen}/>
      </View>

      <View>
        <Text>Descripción</Text>
      </View>

      <View>
        <Text>{avanceData.descripcion}</Text>
      </View>

      <View>
          <Text> Avisos del Curso</Text>
      </View>

      <View>
        <Text>Clases</Text>
      </View>


        <View>
          <Button title="Desvincularme"></Button>

          <Button title="Atras"></Button>

        </View>

    </View>

  )


}