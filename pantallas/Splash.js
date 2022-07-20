import React from "react";
import { View, Dimensions, ImageBackground, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LocaleConfig} from 'react-native-calendars';
import { AnimatedSVGPaths } from "react-native-svg-animations";
const {width, height} = Dimensions.get("window");
import ds from './d';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perfil: [],
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("perfil").then((perfil) => {
      if (perfil !== null) {
        setTimeout(() => {
        this.props.navigation.replace("HomeInicio");
        }, 1000);
      } else {
        this.props.navigation.replace("LoginNavegacion");
      }
    });
  }

  //cuando se deje de usar clase, crear un state que consulte si el usuario esta logueado, si es true, entonces mostrar el texto
  //de abandonar sesión, en cambio si es falso (por defecto), no muestra nada

  async desloguearUsuario() {
    await axios.get("http://128.0.202.248:8011/logout/");
  }

  render() {
    return (
      <ImageBackground
      source={require("../assets/fondo_login.webp")}
      style={{ resizeMode: "stretch", width: width, height: height+30 }}>
      <View style={{justifyContent: 'center', //Centered horizontally
       alignItems: 'center', //Centered vertically
       flex:1}}>
        <AnimatedSVGPaths
          strokeColor={"white"}
          strokeWidth={4}
          duration={1000}
          scale={0.8}
          fill={"#6da290"}
          delay={100}
          rewind
          ds={ds}
        />
        
      </View></ImageBackground>
    );
  }
}
