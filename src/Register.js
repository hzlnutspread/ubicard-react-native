import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

const RegisterPage = () => {
  const navigation = useNavigation();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const sanitizeData = (data) => {
    const sanitizedData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (typeof value === "string") {
          sanitizedData[key] = value.trim().toLowerCase();
        } else {
          sanitizedData[key] = value;
        }
      }
    }
    return sanitizedData;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const sanitizedData = sanitizeData({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
    });

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (!validateEmail(sanitizedData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!validatePassword(sanitizedData.password)) {
      setErrorMessage("Password must be at least 5 characters long");
      return;
    }

    if (sanitizeData.password !== confirmPassword) {
      setErrorMessage("passwords do not match");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.heading}>become an oyster</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={formData.first_name}
            onChangeText={(value) =>
              setFormData({ ...formData, first_name: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={formData.last_name}
            onChangeText={(value) =>
              setFormData({ ...formData, last_name: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) =>
              setFormData({ ...formData, password: value })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirm_password}
            onChangeText={(value) => setConfirmPassword(value)}
          />

          {errorMessage !== "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 16,
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    color: "#000000",
  },
  registerButton: {
    backgroundColor: "#0A9B97",
    width: "100%",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    marginVertical: 8,
  },
  errorMessage: {
    color: "#C54646",
    fontSize: 14,
    textAlign: "left",
  },
});

export default RegisterPage;
