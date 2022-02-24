
import React from 'react';
import {View, Text, Image, StyleSheet, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
const data = [
  {
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../assets/descubrir.jpg'),
    bg: '#59b2ab',
  },
  {
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../assets/descubrir.jpg'),
    bg: '#febe29',
  },
  {
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../assets/descubrir.jpg'),
    bg: '#22bcb5',
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
    marginTop:-50
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize:30
  },
  title: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginTop:-150
  },
});

export default class App extends React.Component {
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
          nextLabel={"Siguiente"}
          doneLabel={"Hecho"}
        />
      </View>
    );
  }
}