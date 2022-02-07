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
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width / 1.3,
          borderRadius: 3,
          top: 10,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          elevation: 3,
          height: 50,
          backgroundColor: "#FFFFFF",
        }}
      >
        <View
          style={{
            width: width / 1.8,
            borderRadius: 3,
            height: 35,
            justifyContent: 'center',
            alignItems:'center',
            backgroundColor: "#F5F5F5",
          }}
        >
          <Text>Buscar...</Text>
        </View>
        <FontAwesome
          name="search"
          size={25}
          color="#90C641"
          style={{ right: 10, position: "absolute" }}
        />
      </View>

      <ScrollView>
        {mapeado.map((item) => (
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
