import React from "react";
import { View, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { AnimatedSVGPaths } from "react-native-svg-animations";
import ds from './d';


export default class Home extends React.Component {

  render() {
    return (
      <Modal
      isVisible={this.props.visible}
      animationIn="bounceInUp"
      animationOut="zoomOutUp"
              backdropTransitionOutTiming={0}
      >
        <View style={{
          flex: 1,
        }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={'white'} style={{ height: 160 }} />
          </View>
        </View>
      </Modal>
    );
  }
}
