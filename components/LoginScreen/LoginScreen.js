import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import { useForm } from "react-hook-form";

export default function LoginScreen(props) {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("../../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
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

  const onSwitchToRegistration = () => {
    props.onSwitchToRegistration();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
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
            style={[s.inputSignIn, errors.email && { borderColor: "#FF6C00" }]}
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
                s.inputSignIn,
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
        <TouchableOpacity style={s.btnSignIn} onPress={handleSubmit(onSubmit)}>
          <Text style={s.btnText}>Увійти</Text>
        </TouchableOpacity>
      </View>

      <Text style={s.linkText} onPress={onSwitchToRegistration}>
        Немає акаунту? Зареєструватися
      </Text>
    </ScrollView>
  );
}

const s = StyleSheet.create({
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
  },
});
