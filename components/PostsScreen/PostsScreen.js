import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function PostsScreen() {
  return (
    <ScrollView style={s.mainBox} contentContainerStyle={s.scrollViewContent}>
      <Text>PostsScreen</Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  mainBox: {
    flex: 1,
    width: "100%",
    height: "65%",
    position: "absolute",
    top: "35%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  scrollViewContent: {
    alignItems: "center",
    gap: 16,
  },
});
