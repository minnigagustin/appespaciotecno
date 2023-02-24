import React from "react";
import "react-native-gesture-handler";
import { Image, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pantallas/Principal";
import Qr from "./pantallas/Qr";
import Perfil from "./pantallas/Perfil";
import EditarPerfil from "./pantallas/EditarPerfil";
import Login from "./pantallas/Login";
import prueba from "./pantallas/prueba";
import Categorias from "./pantallas/Categorias";
import Capacitar from "./pantallas/Capacitar";
import Emprender from "./pantallas/Emprender";
import Registro from "./pantallas/Registro";
import Splash from "./pantallas/Splash";
import PantallaToken from "./pantallas/PantallaToken";
import MisCursos from "./pantallas/MisCursos";
import Notificaciones from "./pantallas/Notificaciones";
import Favoritos from "./pantallas/Favoritos";
import Recuperar from "./pantallas/Recuperar";
import { FontAwesome } from "react-native-vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
const Tab = createDrawerNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 130, height: 50, marginLeft: -20 }}
      source={require("./assets/LOGO-ESPACIOTECNO-HORIZONTAL-01.webp")}
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
      <HomeStack.Screen name="Login" component={Login} />
      <HomeStack.Screen name="Mi Perfil" component={Perfil} />
      <HomeStack.Screen name="MisCursos" component={MisCursos} />
      <HomeStack.Screen name="Mis Favoritos" component={Perfil} />
      <HomeStack.Screen name="EditarPerfil" component={EditarPerfil} />
      <HomeStack.Screen name="Registro" component={Registro} />
      <HomeStack.Screen name="Recuperar" component={Recuperar} />
      <HomeStack.Screen name="PantallaToken" component={PantallaToken} />
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
      <InicioStack.Screen name="Mis Cursos" component={Perfil} />
      <InicioStack.Screen name="MisCursos" component={MisCursos} />
      <InicioStack.Screen name="EditarPerfil" component={EditarPerfil} />
      <InicioStack.Screen name="Notificaciones" component={Notificaciones} />
      <InicioStack.Screen name="MisFavoritos" component={Favoritos} />
      <InicioStack.Screen name="Categorias" component={Categorias} />
      <InicioStack.Screen name="Capacitar" component={Capacitar} />
      <InicioStack.Screen name="Emprender" component={Emprender} />
    </InicioStack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Principal"
      screenOptions={{
        drawerPosition: "left",
        drawerStyle: {
          backgroundColor: '#751c61',
        },
        drawerActiveTintColor : 'white',
        drawerInactiveTintColor: 'white',
        drawerActiveBackgroundColor: '#ffffff26'
      }}
      
    >
      <Tab.Screen
        name="Principal"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"home"} color={"#90C641"} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "left",
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
        }}
      />
      <Tab.Screen name="Mi Perfil" component={Perfil} options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }} />
      {/* !global.authenticated && (
        <Tab.Screen
          name="Iniciar Sesión"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"user"} color={"#90C641"} size={size} />
            ),
            headerShown: false,
          }}
        />
      )}
      {global.authenticated && (
        <Tab.Screen
          name="Recuperar"
          component={Recuperar}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"user"} color={"#90C641"} size={size} />
            ),
            headerShown: false,
          }}
        />
        ) */}
    </Tab.Navigator>
  );
}
const InicioHomeStack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <InicioHomeStack.Navigator>
        <InicioHomeStack.Screen
          name="SplashScreen"
          component={Splash}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"home"} color={"#90C641"} size={size} />
            ),
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "left",
            headerShown: false,
          }}
        />
        <InicioHomeStack.Screen
          name="HomeInicio"
          component={TabNavigator}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"home"} color={"#90C641"} size={size} />
            ),
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "left",
            headerShown: false,
          }}
        />
        <InicioHomeStack.Screen
          name="LoginNavegacion"
          component={HomeStackScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"home"} color={"#90C641"} size={size} />
            ),
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "left",
            headerShown: false,
          }}
        />
        <InicioHomeStack.Screen
          name="Cate"
          component={InicioStackScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <FontAwesome name={"home"} color={"#90C641"} size={size} />
            ),
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: "left",
          }}
        />
      </InicioHomeStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
