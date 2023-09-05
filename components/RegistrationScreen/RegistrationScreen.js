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
import { Svg, Circle, G, Path } from "react-native-svg";

export default function RegistrationScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isPassVisible, setPassVisible] = useState(false);

  const togglePassVisibility = () => {
    setPassVisible(!isPassVisible);
  };

  const onSubmit = (data) => {
    console.log(data);
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
        <Image
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
        <Svg
          style={[
            s.avatarPhotoSvg,
            {
              top: keyboardOpen
                ? Platform.OS === "ios"
                  ? "17.5%"
                  : "10%"
                : "28%",
            },
          ]}
          width="132"
          height="120"
          viewBox="0 0 132 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <G id="Add photo">
            <G id="add">
              <Circle
                id="Ellipse 12"
                cx="119.5"
                cy="93.5"
                r="12"
                fill="white"
                stroke="#FF6C00"
              />
              <Path
                id="Union"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M120 87H119V93H113V94H119V100H120V94H126V93H120V87Z"
                fill="#FF6C00"
              />
            </G>
          </G>
        </Svg>
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
          behavior={Platform.OS === "ios" ? "padding" : null}
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
                    setValue("login", text);
                  }}
                ></TextInput>
                {errors.login && (
                  <Text style={s.errorText}>{errors.login.message}</Text>
                )}
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
                    setValue("email", text);
                  }}
                ></TextInput>
                {errors.email && (
                  <Text style={s.errorText}>{errors.email.message}</Text>
                )}
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
                      setValue("password", text);
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
                {errors.password && (
                  <Text style={s.errorText}>{errors.password.message}</Text>
                )}
              </View>

              <TouchableOpacity
                style={s.btnSignUp}
                onPress={() => {
                  handleSubmit(onSubmit);
                  navigation.navigate("MapScreen");
                }}
              >
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
  avatarPhoto: {
    position: "absolute",
    zIndex: 10,
    width: 120,
    height: 120,
    borderRadius: 16,
    top: "28%",
    left: "35%",
    backgroundColor: "#F6F6F6",
  },
  avatarPhotoSvg: {
    position: "absolute",
    zIndex: 10,
    width: 132,
    height: 120,
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
  inputSignUp: {
    width: 343,
    height: 50,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    paddingLeft: 16,
    borderColor: "#E8E8E8",
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
