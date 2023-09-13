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
import { MaterialIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

export default function RegistrationScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const SignUp = async (email, password) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(response.user, { displayName: login });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigation.navigate("Home");
        }
      });
    } catch (error) {
      console.log(error);
      alert("Login failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = () => {
    SignUp(email, password);
    console.log("register success");
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

  const {
    register,
    formState: { errors },
  } = useForm();

  const [isPassVisible, setPassVisible] = useState(false);

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
        <TouchableOpacity
          style={[
            s.avatarBtn,
            {
              top: keyboardOpen
                ? Platform.OS === "ios"
                  ? "17.5%"
                  : "10%"
                : "28%",
            },
          ]}
        >
          <View
            style={[
              s.avatarPhoto,
              {
                top: keyboardOpen
                  ? Platform.OS === "ios"
                    ? "17.5%"
                    : "10%"
                  : "28%",
              },
            ]}
          />
          <MaterialIcons
            style={[
              s.avatarPhotoSvg,
              {
                top: keyboardOpen ? (Platform.OS === "ios" ? 80 : "10%") : 80,
              },
            ]}
            name="add-circle-outline"
            size={25}
            color="#FF6C00"
          />
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={[
            s.mainBox,
            {
              top: keyboardOpen
                ? Platform.OS === "ios"
                  ? "24%"
                  : "18%"
                : "35%",
            },
          ]}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? -100 : 0}
        >
          <ScrollView contentContainerStyle={s.scrollViewContent}>
            <Text style={s.mainText}>Реєстрація</Text>
            <View style={s.registerContent}>
              <View>
                <TextInput
                  {...register("login", { required: "Login is required" })}
                  style={[
                    s.inputSignUp,
                    errors.login && { borderColor: "#FF6C00" },
                  ]}
                  placeholder="Логін"
                  onChangeText={(text) => {
                    setLogin(text);
                  }}
                ></TextInput>
                {/* {errors.login && (
                  <Text style={s.errorText}>{errors.login.message}</Text>
                )} */}
              </View>
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
                    s.inputSignUp,
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
                      s.inputSignUp,
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
                {/* {errors.login && (
                  <Text style={s.errorText}>{errors.login.message }</Text>
                )} */}
              </View>

              <TouchableOpacity style={s.btnSignUp} onPress={onSubmit}>
                <Text style={s.btnText}>Зареєструватись</Text>
              </TouchableOpacity>
            </View>

            <Text
              style={s.linkText}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
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
    top: "28%",
    left: Platform.OS === "ios" ? "35%" : "34%",
  },
  avatarPhoto: {
    position: "absolute",
    zIndex: 10,
    width: 120,
    height: 120,
    borderRadius: 16,
    // top: "28%",
    // left: Platform.OS === "ios" ? "35%" : "34%",
    backgroundColor: "#F6F6F6",
  },
  avatarPhotoSvg: {
    position: "absolute",
    zIndex: 10,
    borderRadius: 16,
    top: 80,
    left: 107,
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
  inputSignUp: {
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
  btnSignUp: {
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
