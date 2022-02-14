import {
    StyleSheet,
    Text,
    View,
  } from "react-native";

import {FontAwesome} from "react-native-vector-icons";

export default function Eliminar(props){

    return (

        <View style={styles.container}>
            <Text style={styles.titulo_style}> {props.titulo}</Text>
            <Text style={styles.subtitulo_style}> {props.subtitulo} </Text>
            <FontAwesome name="thumbs-o-up" size={24} />
            <Button style={styles.isncribirme_style}><Text style={styles.inscribir_text_style}>Salir</Text></Button>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      borderRadius:34
    },
    titulo_style: {
      fontWeight:800,
      fontSize:24,
      fontFamily:"Roboto"
    },
    subtitulo_style: {
        fontWeight:600,
        fontSize:12
      },
    boton_style : {
        backgroundColor:"4D94C1",
        borderRadius:34,
        marginTop:240,
        marginBottom:110
    },
    texto_style : {
        fontFamily:"Roboto",
        color:"#FFFFFF",
        fontWeight:"bold"
    }
  });