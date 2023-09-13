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
import { useForm } from "react-hook-form";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { signInWithEmailAndPassword } from "@firebase/auth";

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const SignIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home");
    } catch (error: any) {
      console.log(error);
      alert("Login failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    SignIn(email, password);
    console.log("login success");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isPassVisible, setPassVisible] = useState(false);

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

  const togglePassVisibility = () => {
    setPassVisible(!isPassVisible);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>
        <Image
          source={require("../../assets/bcg-image.jpeg")}
          style={s.backgroundImage}
        />
        <KeyboardAvoidingView
          style={[
            s.mainBox,
            {
              top: keyboardOpen
                ? Platform.OS === "ios"
                  ? "41%"
                  : "26%"
                : "45%",
            },
          ]}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}
        >
          <ScrollView contentContainerStyle={s.scrollViewContent}>
            <Text style={s.mainText}>Увійти</Text>
            <View style={s.registerContent}>
              <View>
                <TextInput
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Email is not correct",
                    },
                  })}
                  style={[
                    s.inputSignIn,
                    errors.email && { borderColor: "#FF6C00" },
                  ]}
                  placeholder="Адреса електронної пошти"
                  onChangeText={(text) => {
                    setEmail(text);
                  }}
                ></TextInput>
                {/* {errors.email && (
                  <Text style={s.errorText}>{errors.email.message}</Text>
                )} */}
              </View>
              <View>
                <View style={s.passwordInputContainer}>
                  <TextInput
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Min length is 6",
                      },
                    })}
                    style={[
                      s.inputSignIn,
                      errors.password && { borderColor: "#FF6C00" },
                    ]}
                    placeholder="Пароль"
                    secureTextEntry={!isPassVisible}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                  />
                  <TouchableOpacity
                    style={s.showPassBtn}
                    onPress={togglePassVisibility}
                  >
                    <Text style={s.textShowPassBtn}>
                      {isPassVisible ? "Сховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* {errors.password && (
                  <Text style={s.errorText}>{errors.password.message}</Text>
                )} */}
              </View>
              <TouchableOpacity style={s.btnSignIn} onPress={onSubmit}>
                <Text style={s.btnText}>Увійти</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={s.linkText}
              onPress={() => navigation.navigate("Registration")}
            >
              Немає акаунту? Зареєструватися
            </Text>
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
    top: "35%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 42,
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
  scrollViewContent: {
    alignItems: "center",
    gap: 16,
  },
  registerContent: {
    gap: 16,
  },
  mainText: {
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: Platform.OS === "ios" ? "800" : "500",
    letterSpacing: 0.3,
    marginBottom: 17,
  },
  inputSignIn: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingLeft: 16,
    borderWidth: 1,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  showPassBtn: {
    marginLeft: "auto",
    padding: 16,
  },
  textShowPassBtn: {
    color: "#1B4371",
    fontSize: 16,
    fontStyle: "normal",
  },
  btnSignIn: {
    width: 343,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    color: "#fff",
    alignItems: "center",
    marginTop: 27,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "normal",
  },
  linkText: {
    color: "#1B4371",
  },
  errorText: {
    color: "#FF6C00",
    fontSize: 10,
    paddingLeft: 8,
  },
});
