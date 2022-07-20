import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { AnimatedSVGPaths } from "react-native-svg-animations";
import ds from './d';


export default class Home extends React.Component {

  render() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.visible}
      >
        <View style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <ActivityIndicator size="large" color={'white'} style={{ height: 160 }} />
          </View>
        </View>
      </Modal>
    );
  }
}
