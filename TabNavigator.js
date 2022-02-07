import React from "react";
import {
  Image
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pantallas/Principal";
import Qr from "./pantallas/Qr";
const Tab = createBottomTabNavigator();
import { FontAwesome } from "react-native-vector-icons";

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/espaciotecno.jpg')}
    />
  );
}


const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cursos"
        component={Home}
        options={{
          
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"home"} color={color} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
      <Tab.Screen
        name="Escanea"
        component={Qr}
        options={{
          
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"qrcode"} color={color} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Home}
        options={{
          
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"user"} color={color} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
