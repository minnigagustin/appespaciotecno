import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground} from 'react-native'
import {Modalize} from 'react-native-modalize'
import CourseList from './CourseList'
import CategoriasList from '../pantallas/CategoriasList'

export default class Cources extends React.Component{
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
                        
                            <CourseList
                                onPress={()=>this.props.navigation.navigate("Perfil")}
                                img={require('../assets/xd.png')}
                                title="Adobe XD Prototyping"
                                bg="#fdddf3"
                            />
                             <CourseList
                                img={require('../assets/sketch.png')}
                                title="Sketch shortcuts and tricks"
                                bg="#fef8e3"
                            />
                            <CategoriasList
                                onPress={()=>this.props.navigation.navigate("Perfil")}
                                img={require('../assets/fondo_login.jpg')}
                                title="FABRICACION"
                                bg="#fdddf3"
                            />
                             <CourseList
                                img={require('../assets/ae.png')}
                                title="UI Motion Design in After Effects"
                                bg="#fcf2ff"
                            />
                             <CourseList
                                img={require('../assets/f.png')}
                                title="Figma Essentials"
                                bg="#fff0ee"
                            />
                             <CourseList
                                img={require('../assets/ps.png')}
                                title="Adobe Photoshop. Retouching"
                                bg="#fdddf3"
                            />
                             <CourseList
                                img={require('../assets/sketch.png')}
                                title="Sketch shortcuts and tricks"
                                bg="#fef8e3"
                            />
                             <CourseList
                                img={require('../assets/ae.png')}
                                title="UI Motion Design in After Effects"
                                bg="#fcf2ff"
                            />
                    </View>
                </Modalize>
            </ImageBackground>
        )
    }
}