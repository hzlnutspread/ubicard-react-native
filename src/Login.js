import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { validateUser } from "./utils/userUtils";
import { useUser } from "./contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { useTabPressListener } from "./utils/useTabPressListener";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

const LoginPage = () => {
  const { setUserData } = useUser();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState("#FFFFFF");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#FFFFFF");

  const fetchData = async () => {
    const data = await validateUser();
    if (data) {
      setUserData(data);
      console.log("successfully fetched initial data");
    }
  };

  useTabPressListener(fetchData);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setEmailBorderColor(emailFocused ? "#0A9B97" : "#FFFFFF");
    setPasswordBorderColor(passwordFocused ? "#0A9B97" : "#FFFFFF");

    const lowerCaseEmail = email.toLowerCase();
    if (!validateEmail(lowerCaseEmail)) {
      setIsValidEmail(false);
      setEmailBorderColor("#C54646");
      setPasswordBorderColor("#C54646");
      setErrorMessage("please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordBorderColor("#C54646");
      setEmailBorderColor("#C54646");
      setErrorMessage("password must be at least 5 characters long");
      return;
    }

    try {
      const response = await fetch(
        "https://api.oystergroup.org/flask/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: lowerCaseEmail,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const access_token = data.access_token;
        const refresh_token = data.refresh_token;
        AsyncStorage.setItem("access_token_cookie", access_token);
        AsyncStorage.setItem("refresh_token_cookie", refresh_token);

        if (data.email === "stats@gmail.com") {
          navigation.navigate("/stats/dashboard");
        } else if (data.is_admin) {
          navigation.navigate("/admin/dashboard/");
        } else {
          await fetchData();
          navigation.reset({ index: 0, routes: [{ name: "UserTabs" }] });
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);

        setEmailBorderColor("#C54646");
        setPasswordBorderColor("#C54646");
      }
    } catch (error) {
      console.log("An error occurred!", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.content}>
            <Image
              source={require("../assets/oyster.png")}
              style={styles.image}
            />
            <Text style={styles.welcomeText}>welcome back!</Text>

            <Text style={styles.emailField}>email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderBottomColor: emailBorderColor,
                  color: "#FFFFFF",
                },
              ]}
              onFocus={() => {
                setEmailFocused(true);
                setEmailBorderColor("#0A9B97");
              }}
              onBlur={() => {
                setEmailFocused(false);
                setEmailBorderColor("#FFFFFF");
              }}
              selectionColor="#0A9B97"
              value={email}
              onChangeText={(newEmail) => setEmail(newEmail)}
            />

            <Text style={styles.passwordField}>password</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderBottomColor: passwordBorderColor,
                    color: "#FFFFFF",
                  },
                ]}
                secureTextEntry={!showPassword}
                onFocus={() => {
                  setPasswordFocused(true);
                  setPasswordBorderColor("#0A9B97");
                }}
                onBlur={() => {
                  setPasswordFocused(false);
                  setPasswordBorderColor("#FFFFFF");
                }}
                value={password}
                onChangeText={(newPassword) => setPassword(newPassword)}
                selectionColor="#0A9B97"
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "md-eye-off" : "md-eye"}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {errorMessage !== "" && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotButtonText}>forgot password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  content: {
    padding: 24,
  },
  image: {
    width: 60,
    height: 58,
    resizeMode: "contain",
    marginBottom: 36,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  gladText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  input: {
    paddingTop: 12,
    width: "100%",
    borderBottomWidth: 2,
    paddingBottom: 6,
    borderBottomColor: "#FFFFFF",
    color: "#FFFFFF",
    ...(Platform.OS === "web" && { outlineStyle: "none" }),
  },
  loginButton: {
    backgroundColor: "#0A9B97",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  forgotPasswordButton: {
    margin: "auto",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#151515",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  emailField: {
    color: "#A1A1A1",
    marginTop: 24,
  },
  passwordField: {
    color: "#A1A1A1",
    marginTop: 24,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  passwordToggle: {
    position: "absolute",
    right: 0,
    bottom: 4,
    padding: 0,
  },
  errorContainer: {
    marginVertical: 16,
  },
  errorMessage: {
    color: "#C54646",
    fontSize: 14,
    textAlign: "left",
  },
});

export default LoginPage;
