import React from "react";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

const IntroductionPages = () => {
  const navigation = useNavigation();

  const handleIntroCompleted = async () => {
    try {
      const jwtToken = await AsyncStorage.getItem("access_token_cookie");
      if (!jwtToken) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        return null;
      }

      const response = await fetch(
        "https://api.oystergroup.org/flask/user/watched-introduction",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        navigation.reset({ index: 0, routes: [{ name: "UserTabs" }] });
      }
    } catch (error) {
      console.log("An error occurred!", error);
    }
  };

  const Slide1 = () => {
    return (
      <SafeAreaView style={styles.slideContainer}>
        <Text style={styles.slideText}>Welcome to the Oyster App!</Text>
        <Image
          source={require("../../assets/oyster.png")}
          style={styles.image}
        />
      </SafeAreaView>
    );
  };

  const Slide2 = () => {
    return (
      <SafeAreaView style={styles.slideContainer}>
        <Text style={styles.slideText}>Discover amazing features!</Text>
        <Image
          source={require("../../assets/oyster.png")}
          style={styles.image}
        />
      </SafeAreaView>
    );
  };

  const Slide3 = () => {
    return (
      <SafeAreaView style={styles.slideContainer}>
        <Text style={styles.slideText}>Get started now!</Text>
        <Image
          source={require("../../assets/oyster.png")}
          style={styles.image}
        />
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Swiper dotColor="#FFFFFF" activeDotColor="#0A9B97">
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <View style={styles.button_continer}>
          <TouchableOpacity
            style={styles.continue_button}
            onPress={handleIntroCompleted}
          >
            <Text>Continue to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#151515",
  },
  swiper: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 58,
    resizeMode: "contain",
    marginBottom: 36,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: {
    width: 200,
    height: 200,
  },
  slideText: {
    fontSize: 18,
    marginTop: 20,
    color: "#0A9B97",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  button_continer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  continue_button: {
    color: "#151515",
    backgroundColor: "#0A9B97",
    padding: 16,
    borderRadius: 8,
  },
});

export default IntroductionPages;
