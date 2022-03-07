import React from 'react'
import {Text,TouchableOpacity, View,Image, ImageBackground} from 'react-native'
import ProgressCircle from 'react-native-progress-circle'


export default class CourseList extends React.Component{
    render(){
        const {img,title, bg, onPress} = this.props
        return(
            <TouchableOpacity
                onPress={onPress}
                style={{

                    backgroundColor:"#0088c2",
                    flexDirection: 'row',
                    marginHorizontal:20,
                    borderRadius:20,
                    alignItems:"center",
                    padding: 10,
                    marginTop:10
                }}
            >

                    <View>
                         <Text style={{
                             color:"white",
                             fontWeight:"bold",
                             fontSize:38,
                             paddingHorizontal:15,
                             width:230
                         }}>{title}</Text>
                        
                    </View>
                    <View
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"white",
                                    alignItems:"center",
                                    width:30,
                                    height:30,
                                    borderRadius:15,
                                    justifyContent: 'center',
                                    marginLeft: 80,
                                }}
                           >
                                    <View
                                    >
                                        <Text style={{
                             color:"blue",
                             fontWeight:"bold",
                             fontSize:15,
                         }}>V</Text>
                                        </View>
                           </View>

            </TouchableOpacity>
        )
    }
}