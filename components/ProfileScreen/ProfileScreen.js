import React from "react";
import { Button, Text } from "react-native";

export default function ProfileScreen({ navigation }) {
  return (
    <>
      <Text>ProfileScreen</Text>
      <Button
        onPress={() => navigation.navigate("CommentsScreen")}
        title="CommentsScreen"
      >
        CommentsScreen
      </Button>
      <Button
        onPress={() => navigation.navigate("CreatePostsScreen")}
        title="CreatePostsScreen"
      >
        CreatePostsScreen
      </Button>
      <Button
        onPress={() => navigation.navigate("MapScreen")}
        title="MapScreen"
      >
        MapScreen
      </Button>
    </>
  );
}
