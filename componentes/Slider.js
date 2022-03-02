
import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {AntDesign} from 'react-native-vector-icons';
const data = [
  {
    title: 'Title 1',
    text: 'Desarrollar habilidades blandas y cognitivas generando en los chicos el interés por crear proyectos en ciencias, arte y tecnología, con impacto social, fomentando la curiosidad, la indagación y el emprendedurismo como motores del proceso de aprendizaje.',
    image: require('../assets/descubrir.jpg'),
    bg: '#FFFFFF',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/capacitar.jpg'),
    bg: '#FFFFFF',
  },
  {
    title: '¡Bienvenidos!',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../assets/emprender.jpg'),
    bg: '#FFFFFF',
  },
];


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  image: {
    width: 320,
    height: 320,
    resizeMode:"contain",
    borderRadius: 300 / 20,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize:16
  },
  title: {
    fontSize: 32,
    color: 'black',
    textAlign: 'center',
    marginTop:-150
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends React.Component {

  _renderSkipButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="closecircle"
          color={'#a4b858'}
          size={34}
        />
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="pluscircle"
          color={'#a4b858'}
          size={34}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <AntDesign
          name="checkcircle"
          color={'#a4b858'}
          size={34}
        />
      </View>
    );
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  _keyExtractor = (item) => item.title;

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={data}
          renderNextButton={this._renderNextButton}
          renderDoneButton={this._renderDoneButton}
          showSkipButton
          renderSkipButton={this._renderSkipButton}
          dotStyle={{backgroundColor: '#509bb4'}}
          activeDotStyle={{backgroundColor: '#a4b858'}}
        />
      </View>
    );
  }
}