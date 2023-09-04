import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RegistrationScreen from "./components/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";

export default function App() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const onSwitchToRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  const onSwitchToLogin = () => {
    setIsRegistering(false);
  };

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>
        <Image
          source={require("./assets/bcg-image.jpeg")}
          style={s.backgroundImage}
        />
        <Image
          style={[
            s.avatarPhoto,
            {
              top: keyboardOpen
                ? Platform.OS === "ios"
                  ? "14%"
                  : "13%"
                : "28%",
            },
          ]}
        />
        <KeyboardAvoidingView
          style={[s.mainBox, { top: keyboardOpen ? "20%" : "35%" }]}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}
        >
          {isRegistering ? (
            <RegistrationScreen onSwitchToLogin={onSwitchToLogin} />
          ) : (
            <LoginScreen onSwitchToRegistration={onSwitchToRegistration} />
          )}
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
    top: "35%",
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
  avatarPhoto: {
    position: "absolute",
    zIndex: 10,
    width: 132,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    top: "28%",
  },
});
