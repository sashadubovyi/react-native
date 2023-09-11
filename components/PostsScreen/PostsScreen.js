import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";

export default function PostsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.mainContainer}>
        <View style={s.mainContent}>
          <TouchableOpacity
            style={s.userInfo}
            onPress={() => {
              navigation.navigate("Profile");
            }}
          >
            <Image style={s.userImage}></Image>
            <View>
              <Text style={s.userName}>Oleksandr Dubovyi</Text>
              <Text style={s.userEmail}>sashadubovyi@gmail.com</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  mainContent: {
    paddingTop: 32,
    paddingLeft: 16,
    width: "100%",
    height: "82.5%",
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: "#f0f",
  },
  userInfo: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.80)",
    fontSize: 11,
    fontWeight: Platform.OS === "ios" ? "400" : "400",
  },
});
