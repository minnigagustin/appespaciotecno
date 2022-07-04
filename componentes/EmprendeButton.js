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

                    marginHorizontal:14,
                    alignItems:"center",
                    
                    marginTop:10
                }}
            >
                <ImageBackground source={img} resizeMode="cover"
                style={{width: '100%', borderRadius: 10, overflow: 'hidden'}}>
                    <View style={{flexDirection: 'row', padding: scale(5), paddingVertical: 20}}>

                    <View>
                         <Text style={{
                             color: bg,
                             fontWeight:"bold",
                             fontSize:width*0.080,
                             // textShadowColor: 'rgba(0, 0, 0, 0.5)',
                             // textShadowOffset: {width: 2, height: 3},
                             // textShadowRadius: 10,
                             width:width*0.76
                         }}>{title}</Text>
                        
                    </View>
                    <View
                                onPress={()=>this.props.navigation.navigate('Categorias')}
                                style={{
                                    flexDirection:"row",
                                    backgroundColor:"#8BC544",
                                    alignItems:"center",
                                    width: scale(40),
                                    height: scale(40),
                                    borderRadius:scale(25),
                                    justifyContent: 'center',
                                    marginLeft: scale(2),
                                }}
                           >
                                    <View
                                    >
                                        <Entypo name={'chevron-right'} size={scale(35)} color="white" />
                                        </View>
                           </View>
                           </View>
</ImageBackground>
            </TouchableOpacity>
        )
    }
}