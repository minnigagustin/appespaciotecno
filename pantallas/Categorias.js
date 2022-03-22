import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground} from 'react-native'
import {Modalize} from 'react-native-modalize'
import CourseList from "../componentes/CourseList"
import axios from "axios";
import CategoriasList from '../componentes/CategoriasList'
import { BASE_URL } from "../api";



export default class Cources extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          categorias: [],
        };
      }
    
    componentDidMount(){
        const cursos = BASE_URL + 'curso/'
        axios.get(cursos).then((res) => {
            const cursos = res.data;
            this.setState({categorias: cursos})
            console.log(cursos);
});
    };

    render(){
        return(
            <ImageBackground
                source={require('../assets/FONDO-DESCUBRIR.jpg')}
                style={{width:"100%",height:"100%"}}
            >
                
                <Image
                            source={require('../assets/DESCUBRIR-VERTICAL-01.png')} resizeMode="contain" style={{
                    width: 300,
                    height: 500,
                    alignSelf:"center",
                    top:-120
                    
                    }} />
                

                <Modalize
                    handleStyle={{
                        backgroundColor:"#e9e9e9",
                        width:80
                    }}
                    modalStyle={{
                        borderTopLeftRadius:60,
                        borderTopRightRadius:60
                    }}
                    alwaysOpen={450}
                    scrollViewProps={{showsVerticalScrollIndicator:false}}
                >
                    <View style={{paddingVertical:30}}>

                    <CategoriasList
                                onPress={()=>this.props.navigation.navigate("Perfil")}
                                img={require('../assets/FONDO-DESCUBRIR.jpg')}
                                title="MULTIMEDIA"
                                bg="#fdddf3"
                                activado
                            />
                        {
               this.state.categorias.map((item,i)=>{
                 return(
                            <CourseList
                                id={i}
                                onPress={()=>this.props.navigation.navigate("Perfil")}
                                img={item.picture}
                                title={item.nombre}
                                bg="#fdddf3"
                            />
                            )
                        })
                      }
                             
                    </View>
                </Modalize>
            </ImageBackground>
        )
    }
}