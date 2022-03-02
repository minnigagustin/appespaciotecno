import React from "react";
import "react-native-gesture-handler";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pantallas/Principal";
import Qr from "./pantallas/Qr";

import Perfil from "./pantallas/Perfil";
import MisCursos from "./pantallas/MisCursos";
import Favoritos from "./pantallas/Favoritos";
import AvanceCursos from "./pantallas/AvanceCursos";
import EditarPerfil from "./pantallas/EditarPerfil";
import Login from "./pantallas/Login";
import Categorias from "./pantallas/Categorias";
import Marcas from "./pantallas/Marcas";
import PantallaSlides from "./componentes/Slider";
import { FontAwesome } from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("./assets/espaciotecno.jpg")}
    />
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Mi Perfil" component={Perfil} />
      <HomeStack.Screen name="Mis Cursos" component={MisCursos} />
      <HomeStack.Screen name="Mis Favoritos" component={MisCursos} />
      <HomeStack.Screen name="AvanceCursos" component={AvanceCursos} />
      <HomeStack.Screen name="Favoritos" component={Favoritos} />
      <HomeStack.Screen name="EditarPerfil" component={EditarPerfil} />
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="PantallaSlides" component={PantallaSlides} />
    </HomeStack.Navigator>
  );
}

const InicioStack = createNativeStackNavigator();

function InicioStackScreen() {
  return (
    <InicioStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InicioStack.Screen name="Mi Perfil" component={Home} />
      <InicioStack.Screen name="Mis Cursos" component={MisCursos} />
      <InicioStack.Screen name="Categorias" component={Categorias} />
      <InicioStack.Screen name="Marcas" component={Marcas} />
    </InicioStack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cursos"
        component={InicioStackScreen}
        
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"home"} color={"#90C641"} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Escanea"
        component={Qr}
        options={{
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                position: "absolute",
                bottom: 10, // espacio en el tab
                height: 58,
                width: 58,
                borderRadius: 58,
                elevation: 3,
                backgroundColor: "#ffff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name={"qrcode"} color={"#4D94C1"} size={43} />
            </View>
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"user"} color={"#90C641"} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
        }}
      />

      
    </Tab.Navigator>
  );
};

export default TabNavigator;
