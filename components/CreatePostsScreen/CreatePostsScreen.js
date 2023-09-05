import React, { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { Svg, G, Path, Rect, Defs, ClipPath } from "react-native-svg";

export default function CreatePostsScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = () => {
    if (title && location) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const activeButtonStyle = {
    width: 343,
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: "#ff6c00",
    alignItems: "center",
    borderRadius: 100,
  };

  const disabledButtonStyle = {
    ...activeButtonStyle,
    backgroundColor: "#f6f6f6",
    color: "#BDBDBD",
  };

  const activeButtonTextStyle = {
    color: "#fff",
    fontSize: 16,
  };

  const disabledButtonTextStyle = {
    color: "#BDBDBD",
    fontSize: 16,
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.mainContainer}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <G id="feather-icon / arrow-left">
                <Path
                  id="Shape"
                  d="M20 12H4"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  id="Shape_2"
                  d="M10 18L4 12L10 6"
                  stroke="#212121"
                  stroke-opacity="0.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </G>
            </Svg>
          </TouchableOpacity>
          <Text style={s.title}>Створити публікацію</Text>
        </View>

        <View style={s.mainContent}>
          <View>
            <TouchableOpacity>
              <Image style={s.uploadImage}></Image>
              <Image style={s.uploadImageCircule} />
              <Svg
                style={s.uploadImageSVG}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <G clip-path="url(#clip0_36_0)">
                  <Path
                    d="M11.9998 15.2C13.7671 15.2 15.1998 13.7673 15.1998 12C15.1998 10.2327 13.7671 8.79999 11.9998 8.79999C10.2325 8.79999 8.7998 10.2327 8.7998 12C8.7998 13.7673 10.2325 15.2 11.9998 15.2Z"
                    fill="#BDBDBD"
                  />
                  <Path
                    d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z"
                    fill="#BDBDBD"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_36_0">
                    <Rect width="24" height="24" fill="white" />
                  </ClipPath>
                </Defs>
              </Svg>
              <Text style={s.uploadPhotoText}>Завантажте фото</Text>
            </TouchableOpacity>
          </View>

          <View style={s.containerInput}>
            <View style={s.inputContainer}>
              <TextInput
                style={s.uploadInput}
                placeholder="Назва..."
                onChangeText={(text) => {
                  setTitle(text);
                  handleInputChange();
                }}
              ></TextInput>
            </View>

            <View style={s.inputContainer}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
                  stroke="#BDBDBD"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
              <TextInput
                style={s.uploadInput}
                placeholder="Місцевість..."
                onChangeText={(text) => {
                  setLocation(text);
                  handleInputChange();
                }}
              ></TextInput>
            </View>

            <TouchableOpacity
              style={isButtonDisabled ? disabledButtonStyle : activeButtonStyle}
              disabled={isButtonDisabled}
              onPress={() => {
                if (!isButtonDisabled) {
                  navigation.navigate("MapScreen");
                }
              }}
            >
              <Text
                style={
                  isButtonDisabled
                    ? disabledButtonTextStyle
                    : activeButtonTextStyle
                }
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.menu}>
          <TouchableOpacity
            style={s.deleteBtn}
            onPress={() => navigation.navigate("CommentsScreen")}
          >
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <Path
                d="M3 6H5H21"
                stroke="#BDBDBD"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                d="M19.5 6C19.5 5.72386 19.2761 5.5 19 5.5C18.7239 5.5 18.5 5.72386 18.5 6H19.5ZM5.5 6C5.5 5.72386 5.27614 5.5 5 5.5C4.72386 5.5 4.5 5.72386 4.5 6H5.5ZM7.5 6C7.5 6.27614 7.72386 6.5 8 6.5C8.27614 6.5 8.5 6.27614 8.5 6H7.5ZM15.5 6C15.5 6.27614 15.7239 6.5 16 6.5C16.2761 6.5 16.5 6.27614 16.5 6H15.5ZM18.5 6V20H19.5V6H18.5ZM18.5 20C18.5 20.8284 17.8284 21.5 17 21.5V22.5C18.3807 22.5 19.5 21.3807 19.5 20H18.5ZM17 21.5H7V22.5H17V21.5ZM7 21.5C6.17157 21.5 5.5 20.8284 5.5 20H4.5C4.5 21.3807 5.61929 22.5 7 22.5V21.5ZM5.5 20V6H4.5V20H5.5ZM8.5 6V4H7.5V6H8.5ZM8.5 4C8.5 3.17157 9.17157 2.5 10 2.5V1.5C8.61929 1.5 7.5 2.61929 7.5 4H8.5ZM10 2.5H14V1.5H10V2.5ZM14 2.5C14.8284 2.5 15.5 3.17157 15.5 4H16.5C16.5 2.61929 15.3807 1.5 14 1.5V2.5ZM15.5 4V6H16.5V4H15.5Z"
                fill="#BDBDBD"
              />
              <Path
                d="M10 11V17"
                stroke="#BDBDBD"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                d="M14 11V17"
                stroke="#BDBDBD"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
    justifyContent: "flex-start",
    gap: "90%",
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
    color: "#212121",
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
  deleteBtn: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    gap: 32,
    alignItems: "center",
  },
  uploadImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    zIndex: 5,
  },
  uploadImageCircule: {
    position: "absolute",
    top: "37%",
    left: "40%",
    backgroundColor: "#fff",
    borderRadius: "50%",
    width: 60,
    height: 60,
    zIndex: 6,
  },
  uploadImageSVG: {
    position: "absolute",
    top: "44.7%",
    left: "45.3%",
    zIndex: 7,
  },
  uploadPhotoText: {
    marginTop: 8,
    color: "#bdbdbd",
    fontSize: 16,
  },
  containerInput: {
    gap: 32,
  },
  uploadInput: {
    fontSize: 16,
    width: 343,
  },
  inputContainer: {
    borderColor: "transparent",
    borderBottomColor: "#e8e8e8",
    borderWidth: 1,
    flexDirection: "row",
    gap: 4,
    paddingBottom: 15,
    width: 343,
  },
  textBtn: {
    color: "#fff",
    fontSize: 16,
  },
});
