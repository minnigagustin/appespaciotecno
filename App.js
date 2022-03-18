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
      <TabNavigator />
    </GestureHandlerRootView>
  );
};
export default App;