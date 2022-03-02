import React from 'react'
import {View,Text,ImageBackground,TouchableOpacity,Image} from 'react-native'
import {ScrollView,TextInput} from 'react-native-gesture-handler'
import CourseList from '../pantallas/CourseList'
import Curso from "../componentes/curso";
import { FontAwesome } from "react-native-vector-icons";

export default class Home extends React.Component{
    render(){
        return(
           <ImageBackground
            source={require('../assets/Home.png')}
            style={{width:"100%",height:"100%"}}
           >
               <ScrollView>
               <View style={{
                    flexDirection:"row",
                    width:"100%",
                    paddingHorizontal:20
                }}>
                       <View style={{
                           paddingHorizontal:10,
                           paddingVertical:12,
                           borderRadius:10,
                           marginTop:30,
                           backgroundColor:"#d1a0a7"
                       }}>
                           <Image
                            source={require('../assets/hum.png')}
                            style={{height:15,width:20}}
                           />
                       </View>
                       
                   </View>
                   <Text style={{
                       paddingHorizontal:20,
                       fontSize:35,
                       paddingTop:40,
                       fontWeight:"bold",
                       color:"#FFF"
                   }}>
                       Bienvenido Agustin!
                   </Text>

                   <View style={{
                       flexDirection:"row",
                       alignItems:"center",
                       backgroundColor:"#FFF",
                       padding:10,
                       borderRadius:12,
                       marginHorizontal:20,
                       marginTop:20
                   }}>
                       <TextInput
                            placeholder="¿Que estas buscando?"
                            placeholderTextColor="#345c74"
                            style={{
                                fontWeight:"bold",
                                fontSize:12,
                                width:280,
                                paddingHorizontal:12
                            }}
                       />
                       <Image
                            source={require('../assets/sear.png')}
                            style={{height:14,width:14}}
                       />
                   </View>
                   <ScrollView horizontal>
                     <View style={{width: 530}}>
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:"#549fa4",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30,
                       width: 400
                   }}>
                       <View>
                           <Text style={{
                               color:"white",
                               fontSize:20,
                               fontWeight:"bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               ¿Queres emprender?
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#90C641",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontWeight:"bold",
                                        fontSize:12
                                    }}>Conocenos</Text>  
                                    <Image
                                        source={require('../assets/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../assets/undraw.png')}
                            style={{marginLeft:-80,marginTop:35}}
                       />

<TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Marcas')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"white",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Image
                                        source={require('../assets/EMPRENDER.png')}
                                        style={{width:140,height:40}}
                                    />
                           </TouchableOpacity>

                   </View>
                   </View>

                   <View style={{width: 530}}>
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:"#e41c24",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30,
                       width: 400
                   }}>
                       <View>
                           <Text style={{
                               color:"white",
                               fontSize:20,
                               fontWeight:"bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               ¿Queres aprender?
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#90C641",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontWeight:"bold",
                                        fontSize:12
                                    }}>Conocenos</Text>  
                                    <Image
                                        source={require('../assets/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../assets/undraw.png')}
                            style={{marginLeft:-80,marginTop:35}}
                       />

                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"white",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Image
                                        source={require('../assets/DESCUBRIR.png')}
                                        style={{width:140,height:40}}
                                    />
                           </TouchableOpacity>

                   </View>
                   </View>

                   <View style={{width: 530}}>
                   <View style={{
                       flexDirection:"row",
                       backgroundColor:"#549fa4",
                       marginTop:15,
                       marginHorizontal:20,
                       borderRadius:20,
                       paddingVertical:30,
                       paddingLeft:30,
                       width: 400
                   }}>
                       <View>
                           <Text style={{
                               color:"white",
                               fontSize:20,
                               fontWeight:"bold",
                               width:250,
                               paddingRight:100 
                           }}>
                               ¿Queres capacitarte?
                           </Text>
                           <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#90C641",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontWeight:"bold",
                                        fontSize:12
                                    }}>Conocenos</Text>  
                                    <Image
                                        source={require('../assets/a3.png')}
                                        style={{marginLeft:20,width:8,height:8}}
                                    />
                           </TouchableOpacity>
                       </View>
                       <Image
                            source={require('../assets/undraw.png')}
                            style={{marginLeft:-80,marginTop:35}}
                       />

                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('Marcas')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"white",
                                    alignItems:"center",
                                    marginTop:20,
                                    width:150,
                                    paddingVertical:10,
                                    borderRadius:14,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Image
                                        source={require('../assets/CAPACITAR.png')}
                                        style={{width:140,height:40}}
                                    />
                           </TouchableOpacity>

                   </View>
                   </View>

                   </ScrollView>
                   <Text style={{
                       color:"#345c74",
                       fontWeight:"bold",
                       fontSize:20,
                       paddingHorizontal:20,
                       marginTop:20,
                       marginBottom:10
                   }}>Cursos para vos!</Text>

            

                   <CourseList
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
                        img={require('../assets/ae.png')}
                        title="UI Motion Design in After Effects"
                        bg="#fcf2ff"
                   />
                   <CourseList
                        img={require('../assets/ae.png')}
                        title="UI Motion Design in After Effects"
                        bg="#fcf2ff"
                   />
               </ScrollView>
           </ImageBackground>
        )
    }
}