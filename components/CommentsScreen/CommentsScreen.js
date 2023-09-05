import React from "react";
import { Button, Text } from "react-native";

export default function CommentsScreen({ navigation }) {
  return (
    <>
      <Text>CommentsScreen</Text>
      <Button
        onPress={() => navigation.navigate("MapScreen")}
        title="MapScreen"
      >
        MapScreen
      </Button>
      <Button
        onPress={() => navigation.navigate("CreatePostsScreen")}
        title="CreatePostsScreen"
      >
        CreatePostsScreen
      </Button>
      <Button
        onPress={() => navigation.navigate("ProfileScreen")}
        title="ProfileScreen"
      >
        ProfileScreen
      </Button>
    </>
  );
}
