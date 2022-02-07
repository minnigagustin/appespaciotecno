import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
// iconos
import { FontAwesome } from "react-native-vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function curso(props) {
  return (
    <View style={styles.divpadre}>
      <View style={styles.div}>
        <FontAwesome
          name="calendar-check-o"
          size={20}
          color="#fff"
          style={{ top: 5, left: 5, position: "absolute" }}
        />
        <FontAwesome
          name="heart"
          size={20}
          color="#fff"
          style={{ top: 5, right: 10, position: "absolute" }}
        />
        <View style={{ left: -15, marginBottom: 5 }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            Hola, {props.nombre}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 20 }}>
            {props.subtitulo}
          </Text>
        </View>
        <Text style={{ fontWeight: "300", fontSize: 14 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere
          nisl mauris, id ultricies nisi tempor eget. Nam dictum elit nisl,
          vitae ullamcorper...
        </Text>
      </View>
      <View style={styles.divlargo}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{props.fecha}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divpadre: {
    width: width - 40,
    height: height / 4,
    margin: 25,
    borderRadius: 12,
  },
  div: {
    backgroundColor: "#90C641",
    padding: 45,
    left: -5,
    width: width - 40,
    height: height / 4,
    paddingTop: 30,
    borderRadius: 12,
  },
  divlargo: {
    backgroundColor: "#4D94C1",
    width: width - 40,
    marginLeft: 20,
    alignItems: "center",
    position: "absolute",
    bottom: -20,
    height: 30,
  },
});
