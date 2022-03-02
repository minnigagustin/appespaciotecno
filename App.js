import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import {
  GestureHandlerRootView,
  RectButton,
} from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;