import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground} from 'react-native'
import {Modalize} from 'react-native-modalize'
import CourseList from '../pantallas/CourseList'

export default class Cources extends React.Component{
    render(){
        return(
            <ImageBackground
                source={require('../assets/cat.png')}
                style={{width:"100%",height:"100%"}}
            >
                <View style={{
                    flexDirection:"row",
                    width:"100%",
                    paddingHorizontal:20
                }}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.goBack()}
                        style={{
                            paddingHorizontal:10,
                            paddingVertical:13,
                           borderRadius:10,
                            marginTop:30,
                           backgroundColor:"#8bbcdb"
                        }}
                    >
                        <Image
                            source={require('../assets/a1.png')}
                            style={{width:20,height:15}}
                        />
                    </TouchableOpacity>
                    
                </View>
                <Text style={{
                    color:"#FFF",
                    fontSize:35,
                    fontWeight:"bold",
                    width:200,
                    alignSelf:"center",
                    textAlign:"center",
                    marginTop:34
                    
                    }}>
                    UI/UX Cursos
                </Text>

                <Modalize
                    handleStyle={{
                        marginTop:30,
                        backgroundColor:"#e9e9e9",
                        width:80
                    }}
                    modalStyle={{
                        borderTopLeftRadius:60,
                        borderTopRightRadius:60
                    }}
                    alwaysOpen={500}
                    scrollViewProps={{showsVerticalScrollIndicator:false}}
                >
                    <View style={{marginTop:40}}>
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