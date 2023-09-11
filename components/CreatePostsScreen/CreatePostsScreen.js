import React, { useEffect, useState } from "react";
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
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export default function CreatePostsScreen({ navigation, showCustomTabBar }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
        <View style={s.mainContent}>
          <View>
            <View style={s.uploadImage}>
              <Camera
                style={[s.camera, { borderRadius: 8 }]}
                type={type}
                ref={setCameraRef}
              >
                <View style={s.photoView}>
                  <TouchableOpacity
                    style={s.flipContainer}
                    onPress={() => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}
                  ></TouchableOpacity>
                </View>
              </Camera>
            </View>
            <TouchableOpacity
              style={s.uploadImageCircule}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setCapturedImage(uri);
                }
              }}
            >
              <FontAwesome
                style={s.uploadImageSVG}
                name="camera"
                size={24}
                color="#bdbdbd"
              />
            </TouchableOpacity>

            {capturedImage && (
              <Image source={{ uri: capturedImage }} style={s.capturedImage} />
            )}
            <TouchableOpacity
              onPress={() => {
                if (capturedImage) {
                  setCapturedImage(null);
                }
              }}
            >
              <Text style={s.uploadPhotoText}>
                {capturedImage ? "Видалити фото" : "Завантажте фото"}
              </Text>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MapScreen");
                }}
              >
                <Feather name="map-pin" size={24} color="#bdbdbd" />
              </TouchableOpacity>
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
                  navigation.navigate("PostsScreen");
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
        {showCustomTabBar && (
          <View style={s.customTabBar}>
            <TouchableOpacity
              style={s.deleteBtn}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Feather name="trash-2" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
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
    marginBottom: 40,
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
    zIndex: 5,
  },
  uploadImageCircule: {
    position: "absolute",
    top: "33%",
    left: "40%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
    width: 60,
    height: 60,
    zIndex: 6,
  },
  uploadImageSVG: {
    position: "absolute",
    top: "32%",
    left: "30%",
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
  container: { flex: 1 },
  camera: {
    flex: 1,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },

  flipContainer: {
    flex: 0.1,
    alignSelf: "flex-end",
  },

  button: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 50,
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 50,
  },
  capturedImage: {
    position: "absolute",
    width: 343,
    height: 240,
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: "#E8E8E8",
    zIndex: 6,
  },
});
