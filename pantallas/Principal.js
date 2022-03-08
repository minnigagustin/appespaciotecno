import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import CourseList from "../pantallas/CourseList";
import Curso from "../componentes/curso";
import { FontAwesome } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default class Home extends React.Component {
  render() {
    return (
      <ScrollView>
        <LinearGradient
          style={{ flex: 2, padding: 10 }}
          colors={["#4D94C1", "#90C641"]}
        >
          <Text
            style={{
              paddingHorizontal: 8,
              fontSize: 35,
              paddingTop: 40,
              fontWeight: "bold",
              color: "#FFF",
            }}
          >
            Bienvenido Agustin!
          </Text>
          <Text
            style={{
              paddingHorizontal: 15,
              textAlign: "center",
              fontSize: 25,
              fontWeight: "900",
              color: "#FFF",
            }}
          >
            ¿Que taller te gustaria hacer?
          </Text>
          <View style={{ height: 100 }} />
        </LinearGradient>
        <ScrollView horizontal style={{ bottom: 100 }}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "red",
              marginTop: 15,
              marginHorizontal: 10,
              elevation: 7,
              borderRadius: 20,
              marginBottom: 16,
              paddingVertical: 30,
              paddingLeft: 30,
              width: 400,
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  width: 250,
                  paddingRight: 100,
                }}
              >
                ¿Queres emprender?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Categorias")}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#90C641",
                  alignItems: "center",
                  marginTop: 20,
                  width: 150,
                  paddingVertical: 10,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Conocenos
                </Text>
                <Image
                  source={require("../assets/a3.png")}
                  style={{ marginLeft: 20, width: 8, height: 8 }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/undraw.png")}
              style={{ marginLeft: -80, marginTop: 35 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#e41c24",
              marginTop: 15,
              marginHorizontal: 20,
              elevation: 7,
              borderRadius: 20,
              marginBottom: 16,
              paddingVertical: 30,
              paddingLeft: 30,
              width: 400,
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  width: 250,
                  paddingRight: 100,
                }}
              >
                ¿Queres aprender?
              </Text>
            </View>
            <Image
              source={require("../assets/undraw.png")}
              style={{ marginLeft: -80, marginTop: 35 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#3499c2",
              marginTop: 15,
              marginHorizontal: 20,
              elevation: 7,
              borderRadius: 20,
              marginBottom: 16,
              paddingVertical: 30,
              paddingLeft: 30,
              width: 400,
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  width: 250,
                  paddingRight: 100,
                }}
              >
                ¿Queres capacitarte?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Categorias")}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#90C641",
                  alignItems: "center",
                  marginTop: 20,
                  width: 150,
                  paddingVertical: 10,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFF",
                    fontWeight: "bold",
                    fontSize: 12,
                  }}
                >
                  Conocenos
                </Text>
                <Image
                  source={require("../assets/a3.png")}
                  style={{ marginLeft: 20, width: 8, height: 8 }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require("../assets/undraw.png")}
              style={{ marginLeft: -80, marginTop: 35 }}
            />
          </View>
        </ScrollView>

        <View
          style={{
            top: -70,
          }}
        >
          <Text style={{ textAlign: "center", fontSize: 22 }}>
            En ESPACIO TECNO podras
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
          >
            <Text style={{ color: "#eb0032" }}>descubrir,</Text>{" "}
            <Text style={{ color: "#3499c2" }}>capacitarte</Text>{" "}
            <Text style={{ color: "#a1b94b" }}>y emprender</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            Cada area cuenta con talleres y cursos para potenciar tu
            conocimiento.
          </Text>
          <Text
            style={{
              color: "#353535",
              fontWeight: "bold",
              fontSize: 24,
              paddingHorizontal: 20,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            ¡Descubrilos!
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#eb0032",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 3,
                marginLeft: -4,
                borderRadius: 20,
                width: 120,
              }}
              onPress={() => this.props.navigation.navigate("Categorias")}
            >
              <View>
                <Image
                  source={require("../assets/DESCUBRIRACCESO.png")}
                  style={{ width: 110, height: 110 }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#3499c2",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 20,
                paddingVertical: 3,
                borderRadius: 10,
                width: 120,
              }}
            >
              <View>
                <Image
                  source={require("../assets/CAPACITARACCESO.png")}
                  style={{ width: 110, height: 110 }}
                />
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#a1b94b",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 3,
                borderRadius: 20,
                width: 120,
              }}
            >
              <View>
                <Image
                  source={require("../assets/EMPRENDERACCESO.png")}
                  style={{ width: 110, height: 110 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
