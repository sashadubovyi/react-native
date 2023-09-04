import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./components/RegistrationScreen/RegistrationScreen.js";
import LoginScreen from "./components/LoginScreen/LoginScreen.js";
import PostsScreen from "./components/PostsScreen/PostsScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="PostsScreen" component={PostsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
