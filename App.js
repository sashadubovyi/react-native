import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./components/RegistrationScreen/RegistrationScreen.js";
import LoginScreen from "./components/LoginScreen/LoginScreen.js";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen.js";
import MapScreen from "./components/MapScreen/MapScreen.js";
import CreatePostsScreen from "./components/CreatePostsScreen/CreatePostsScreen.js";
import CommentsScreen from "./components/CommentsScreen/CommentsScreen.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Registration">
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
