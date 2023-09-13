import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

interface RouterProops {
  navigation: NavigationProp<any, any>;
}

export default function ProfileScreen({ navigation }: RouterProops) {
  const [likes, setLikes] = useState(200);
  const [isLiked, setIsLiked] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // const handleLike = () => {
  //   if (isLiked) {
  //     setLikes(likes - 1);
  //   } else {
  //     setLikes(likes + 1);
  //   }
  //   setIsLiked(!isLiked);
  // };

  // const handlePress = () => {
  //   setIsPressed(!isPressed);
  // };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>
        <Image
          source={require("../../assets/bcg-image.jpeg")}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <TouchableOpacity style={s.avatarBtn}>
          <View style={s.avatarPhoto} />
          <MaterialIcons
            style={s.avatarPhotoSvg}
            name="add-circle-outline"
            size={25}
            color="#FF6C00"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={s.logOutBtn}
          // onPress={() => navigation.navigate("Registration")}
          onPress={() => FIREBASE_AUTH.signOut()}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>

        <KeyboardAvoidingView style={s.mainBox}>
          <ScrollView>
            <View style={s.postsContainer}>
              <View style={s.userPost}>
                <View style={s.postImage} />
                <Text style={s.postTitle}>Post Title</Text>
                <View style={s.postFooter}>
                  <View style={s.postCounts}>
                    <TouchableOpacity style={s.postComments}>
                      <Feather
                        name="message-circle"
                        size={24}
                        style={{ transform: [{ rotate: "260deg" }] }}
                        color="#FF6C00"
                      />
                      <Text style={s.commentsCount}>3</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={s.postLikes}>
                      {isLiked ? (
                        <AntDesign name="like1" size={24} color="#FF6C00" />
                      ) : (
                        <AntDesign name="like2" size={24} color="#FF6C00" />
                      )}
                      <Text style={s.likesCount}>{likes}</Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity style={s.postLocation}>
                      <Feather name="map-pin" size={24} color="#bdbdbd" />
                      <Text style={s.locationText}>Location</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  mainBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "18%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 92,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  avatarBtn: {
    position: "absolute",
    zIndex: 10,
    top: "12%",
    left: Platform.OS === "ios" ? "35%" : "34%",
  },
  avatarPhoto: {
    position: "absolute",
    zIndex: 10,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatarPhotoSvg: {
    position: "absolute",
    zIndex: 10,
    borderRadius: 16,
    top: 80,
    left: 107,
  },
  logOutBtn: {
    position: "absolute",
    zIndex: 10,
    width: 132,
    height: 120,
    borderRadius: 16,
    top: "21%",
    // right: "-16x%",
    left: 365,
  },
  postsContainer: {
    alignItems: "center",
  },
  userPost: {
    width: 343,
    gap: 8,
  },
  postImage: {
    width: 343,
    height: 240,
    backgroundColor: "gray",
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 16,
    color: "#212121",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postCounts: {
    flexDirection: "row",
    gap: 24,
  },
  postComments: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentsCount: {
    fontSize: 16,
  },
  postLikes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  likesCount: {
    fontSize: 16,
  },
  postLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
