import React from 'react'
import {Text,TouchableOpacity, View,Image} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'


export default class CourseList extends React.Component{
    render(){
        const {img,title, bg, onPress} = this.props
        return(
            <TouchableOpacity
                onPress={onPress}
                style={{
                    flexDirection:"row",
                    backgroundColor:"#d9eefb",
                    padding:20,
                    marginHorizontal:20,
                    borderRadius:20,
                    alignItems:"center",
                    marginTop:10
                }}
            >
                    <Image
                        source={img}
                        style={{width:40,height:40}}
                    />

                    <View>
                         <Text style={{
                             color:"#345c74",
                             fontWeight:"bold",
                             fontSize:16,
                             paddingHorizontal:20,
                             width:170
                         }}>{title}</Text>
                        
                    </View>
                    <View
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#0088c2",
                                    alignItems:"center",
                                    width:130,
                                    paddingVertical:10,
                                    borderRadius:10,
                                    marginLeft: 10,
                                    paddingHorizontal:10
                                }}
                           >
                                    <Text style={{
                                        color:"#FFF",
                                        fontWeight:"bold",
                                        fontSize:14
                                    }}>INSCRIBIRME</Text>  
                                    <Image
                                        source={require('../assets/a3.png')}
                                        style={{marginLeft:10,width:8,height:8}}
                                    />
                           </View>

            </TouchableOpacity>
        )
    }
}