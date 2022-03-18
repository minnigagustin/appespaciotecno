import {
    StyleSheet,
    Text,
    View,
  } from "react-native";

export default function Inscripción(props){

    return (

        <View style={styles.container}>
            <Text style={styles.titulo_style}> {props.titulo}</Text>
            <Text style={styles.subtitulo_style}> {props.subtitulo} </Text>
            <Text style={styles.parrafo_style}> {props.parrafo} </Text>
            <Button style={styles.isncribirme_style}><Text style={styles.inscribir_text_style}>{props.texto}</Text></Button>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      justifyContent: "center",
      borderRadius:33
    },
    titulo_style: {
      fontWeight:800,
      fontSize:24
    },
    subtitulo_style: {
        fontWeight:600,
        fontSize:12
      },
    parrafo_style: {
        fontWeight:400,
        fontSize:13
    },
    boton_style : {
        backgroundColor:"4D94C1",
        borderRadius:34,
        marginLeft:27,
        marginRight:36,
        marginTop:295,
        marginBottom:293
    },
    texto_style : {
        fontFamily:"Roboto",
        color:"#FFFFFF",
        fontWeight:"bold"
    }
  });