import React from "react";
import {
  Image, View
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pantallas/Principal";
import Qr from "./pantallas/Qr";

import Perfil from "./pantallas/Perfil";
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
            <FontAwesome name={"home"} color={'#90C641'} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
      <Tab.Screen
        name="Escanea"
        component={Qr}
        options={{
          
          tabBarIcon: ({ size, color }) => ( <View
            style={{
              position: 'absolute',
              bottom: 10, // espacio en el tab
              height: 58,
              width: 58,
              borderRadius: 58,
              elevation: 3,
              backgroundColor: '#ffff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome name={"qrcode"} color={'#4D94C1'} size={43} />
            </View>
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name={"user"} color={'#90C641'} size={size} />
          ),
          headerTitle: (props) => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
