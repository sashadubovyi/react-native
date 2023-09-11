import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import {
  AntDesign,
  Feather,
  SimpleLineIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import PostsScreen from "../PostsScreen/PostsScreen";
import CreatePostsScreen from "../CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

const Tabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  const [showCustomTabBar, setShowCustomTabBar] = useState(false);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#212121",
        tabBarActiveBackgroundColor: "#ff6c00",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          height: 40,
          borderRadius: 20,
          marginLeft: 35,
          marginRight: 35,
          marginTop: 5,
        },
      })}
      initialRouteName="MapScreen"
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("Login")}
            >
              <MaterialIcons name="logout" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <SimpleLineIcons name={"grid"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          tabBarStyle: {
            display: "none",
          },
          title: "Створити публікацію",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name={"plus"}
              size={size}
              color={color}
              onPress={() => {
                setShowCustomTabBar(true);
                navigation.navigate("CreatePostsScreen");
              }}
            />
          ),
        })}
      >
        {() => (
          <CreatePostsScreen
            navigation={navigation}
            showCustomTabBar={showCustomTabBar}
          />
        )}
      </Tabs.Screen>

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name={"user"} size={size} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
