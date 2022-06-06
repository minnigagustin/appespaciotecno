import React from 'react'
import {Text,TouchableOpacity, View,Image, ImageBackground, Dimensions} from 'react-native'
import { Entypo } from "react-native-vector-icons";
const { width, height } = Dimensions.get("window");

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
                    <View style={{flexDirection: 'row', padding: 10, paddingVertical: 20}}>

                    <View>
                         <Text style={{
                             color: bg,
                             fontWeight:"bold",
                             fontSize:(width/12)-2,
                             // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                             // textShadowOffset: {width: 2, height: 3},
                             // textShadowRadius: 10,
                             paddingHorizontal:15,
                             width:width/1.5
                         }}>{title}</Text>
                        
                    </View>
                    <View
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#8BC544",
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
                                        <Entypo name={'chevron-right'} size={35} color="white" />
                                        </View>
                           </View>
                           </View>
</ImageBackground>
            </TouchableOpacity>
        )
    }
}