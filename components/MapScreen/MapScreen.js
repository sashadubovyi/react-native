import React from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import { Svg, G, Path, Rect, Defs, ClipPath } from "react-native-svg";

export default function MapScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.mainContainer}>
        <View style={s.header}>
          <Text style={s.title}>Публікації</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="feather-icon / log-out">
                <Path
                  id="Shape"
                  d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Shape_2"
                  d="M17 16L21 12L17 8"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Shape_3"
                  d="M21 12H9"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </G>
            </Svg>
          </TouchableOpacity>
        </View>

        <View style={s.mainContent}>
          <View style={s.userInfo}>
            <Image style={s.userImage}></Image>
            <View>
              <Text style={s.userName}>Oleksandr Dubovyi</Text>
              <Text style={s.userEmail}>sashadubovyi@gmail.com</Text>
            </View>
          </View>
        </View>

        <View style={s.menu}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="feather-icon / grid">
                <Rect width="24" height="24" fill="white" />
                <Path
                  id="Rectangle-path"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 3H10V10H3V3Z"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Rectangle-path_2"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 3H21V10H14V3Z"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Rectangle-path_3"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14 14H21V21H14V14Z"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Rectangle-path_4"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 14H10V21H3V14Z"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </G>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("CreatePostsScreen")}
          >
            <Svg
              width="70"
              height="40"
              viewBox="0 0 70 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="40 / Toolbar / new" clip-path="url(#clip0_36_119)">
                <Rect
                  id="Rectangle"
                  width="70"
                  height="40"
                  rx="20"
                  fill="#FF6C00"
                />
                <Path
                  id="Union"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
                  fill="white"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_36_119">
                  <Rect width="70" height="40" fill="white" />
                </ClipPath>
              </Defs>
            </Svg>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="feather-icon / user">
                <Path
                  id="Shape"
                  d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Oval"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </G>
            </Svg>
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
    paddingTop: 70,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: "140%",
    width: "100%",
    alignItems: "center",
    borderColor: "transparent",
    borderBottomColor: "#E8E8E8",
    borderWidth: 1,
    height: 60,
    paddingRight: 10,
    paddingLeft: 10,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontWeight: Platform.OS === "ios" ? "500" : "500",
    fontSize: 17,
  },
  menu: {
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderColor: "transparent",
    borderTopColor: "#E8E8E8",
    borderWidth: 1,
    paddingTop: 9,
    paddingBottom: 40,
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
