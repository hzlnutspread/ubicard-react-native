import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fixedTop}>
        <Text style={styles.topText}>welcome to ostudy</Text>
      </View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.scrollContentInner}>
          <Image
            source={require("../assets/oyster.png")}
            style={styles.image}
          />
          <Text style={styles.title}>
            log in or sign up below to become an oyster
          </Text>
        </View>
      </ScrollView>
      <View style={styles.fixedBottom}>
        <TouchableOpacity
          style={styles.button_login}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_register}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button_register}
          onPress={() =>
            Linking.openURL("https://members.oystergroup.org/user/dashboard")
          }
        >
          <Text style={styles.buttonText}>Go to ostudy</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  fixedTop: {
    paddingTop: 12,
    backgroundColor: "#151515",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 340,
    resizeMode: "contain",
  },
  topText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: 700,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentInner: {
    padding: 24,
    backgroundColor: "#151515",
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  fixedBottom: {
    padding: 16,
  },
  button_login: {
    backgroundColor: "#0A9B97",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button_register: {
    backgroundColor: "#737373",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
