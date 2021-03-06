import React from 'react'
import {Text,TouchableOpacity, View,Image, ImageBackground, Dimensions} from 'react-native'
import { Entypo } from "react-native-vector-icons";
const { width, height } = Dimensions.get("window");

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


export default class CategoriasList extends React.Component{
    render(){
        const {img,title, bg, onPress, activado} = this.props
        return(
            <TouchableOpacity
                onPress={onPress}
                style={{

                    marginHorizontal:20,
                    alignItems:"center",
                    
                    marginTop:10
                }}
            >
                <ImageBackground source={img} resizeMode="cover"
                style={{width: '100%', borderRadius: 10, overflow: 'hidden'}}>
                    <View style={{flexDirection: 'row', paddingVertical: 10}}>

                    <View>
                         <Text style={{
                             color: bg,
                             fontWeight:"bold",
                             fontSize:scale(27),
                             // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                             // textShadowOffset: {width: 2, height: 3},
                             // textShadowRadius: 10,
                             paddingHorizontal:width/40,
                             width:width/1.4,
                         }}>{title}</Text>
                        
                    </View>
                    <View
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"rgba(0,0,0,0.3)",
                                    alignItems:"center",
                                    width:(width/8)-2,
                                    height:(width/8)-2,
                                    borderRadius:25,
                                    justifyContent: 'center',
                                    marginLeft: 10,
                                }}
                           >
                                    <View
                                    >
                                        <Entypo name={activado ? 'chevron-up' : 'chevron-down'} size={35} color="white" />
                                        </View>
                           </View>
                           </View>
</ImageBackground>
            </TouchableOpacity>
        )
    }
}