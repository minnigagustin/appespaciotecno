
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from 'react';
import {ModalSolicitarEliminarCurso} from "../componentes/ModalSolicitarEliminarCurso"
import {ModalConfirmarEliminarCurso} from "../componentes/ModalConfirmarEliminarCurso"

export default function AvanceCursos(props) {


const [eliminarModal, setEliminarModal] = useState(false)

const setEliminarVisible = () => {
    setEliminarModal(true)
}

const restoreModal = () => {
    setEliminarModal(false)
}

  const avanceData = 
    {
      nombre: "React",
      imagen: require('../assets/react.png'),
      descripcion: "Lorem ipsum dolor sit amet consectetur adipiscing elit, ligula nulla nullam penatibus dictum. Nibh leo venenatis lacus mi quisque suscipit sed penatibus quam, gravida nunc montes at mollis convallis vivamus neque tellus imperdiet, sagittis vehicula dui ac nullam sem conubia lobortis.",
      nro_clases: 5,
      total_clases:10
    };

  return (
  
    <View style={styles.container}>

      <View>
        <Text style={styles.title_style}>{avanceData.nombre}</Text>
      </View>

      <View style={styles.container_image}>
        <Image style={styles.image_style}source={avanceData.imagen}/>
      </View>

      <ScrollView>

            <View style={styles.container_descripcion}>
                <Text style={styles.descripcion_title}>Descripción</Text>
                <Text >{avanceData.descripcion}</Text>
            </View>

            <View>
                <Text style={styles.avisos_style}> Avisos del Curso</Text>
            </View>

            <View>
                <Text style={styles.clases_style}>{avanceData.nro_clases}/{avanceData.total_clases}</Text>
            </View>


            <View style={styles.container_buttons}>

                <TouchableOpacity style={styles.desvincular_style} onPress={() => setEliminarVisible()}>
                    <Text style={styles.desvincular_text}> X Desvincularme X </Text>
                </TouchableOpacity>

                <Text style={styles.text_volver}> Volver ... </Text>
                
                <TouchableOpacity style={styles.atras_style}>
                    <Text style={styles.atras_text}> Atras </Text>
                </TouchableOpacity>
            </View>

            <View>
                {eliminarModal && <ModalConfirmarEliminarCurso 
                    state={eliminarModal}
                    restore={restoreModal}/>}
            </View>

        </ScrollView>

    </View>
    

  )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    title_style : {
        alignItems:"flex-start",
        textAlign:"left",
        fontSize: 35,
        fontWeight:"bold",
        fontFamily:"Roboto",
        marginTop:20
    },
    image_style : {
        justifyContent:"center",
        alignContent:"center",
        textAlign:"center"
    },
    container_image : {
        justifyContent:"center",
        alignItems:"center"
    },
    descripcion_title : {
        fontSize:19,
        fontFamily:"sans-serif-condensed",
        fontWeight:"bold"
    },
    description_text : {
        fontSize:15,
        fontFamily:"notoserif",

    },
    container_descripcion : {
        marginRight:25,
        marginLeft:25,
        marginTop:20
    },
    avisos_style : {
        borderRadius:34,
        backgroundColor:"#000000",
        fontWeight:"bold",
        fontSize : 24,
        color:"white",
        textAlign:"center",
        marginTop:20
    },
    clases_style : {
        borderRadius:34,
        backgroundColor:"#90C641",
        fontWeight:"bold",
        fontSize : 24,
        color:"black",
        textAlign:"center",
        marginTop:20
    },
    desvincular_style: {
        borderRadius: 12,
        backgroundColor:"#FA0000"
      },
    desvincular_text : {
        color: "white",
        fontSize: 28,
        fontWeight: "bold",
        width: 300,
        textAlign: "center"
    },  
    atras_text : {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    atras_style : {
        backgroundColor:"white",
        marginTop:10
    },
    container_buttons : {
        justifyContent:"center",
        alignContent:"center",
        fontSize:35,
        marginTop:40,
        alignItems: "center"
    },
    text_volver : {
        fontSize: 16,
        textAlign: "center",
        marginTop: 10
    }
  });