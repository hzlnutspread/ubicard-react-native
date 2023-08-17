import Modal from "react-native-modal";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { validateUserProfile } from "../utils/userUtils";
import { useTabPressListener } from "../utils/useTabPressListener";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

const ProfilePage = () => {
  const { userData } = useUser();
  const navigation = useNavigation();
  const { isLoading, fetchData } = useTabPressListener(validateUserProfile);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    (async function () {
      await fetchData();
    })();
  }, []);

  const logOut = async () => {
    const jwtToken = AsyncStorage.getItem("access_token_cookie");
    const data = await fetch(`https://api.oystergroup.org/flask/auth/logout`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => data);
    return data;
  };

  const handleLogout = async () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    setLogoutModalVisible(false);
    const data = await logOut();
    AsyncStorage.removeItem("access_token_cookie");
    AsyncStorage.removeItem("refresh_token_cookie");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0A9B97" />
      ) : (
        <>
          <Text style={styles.body_text}>
            {userData.message} for {userData.user.first_name}
          </Text>
          <TouchableOpacity style={styles.logout_button} onPress={handleLogout}>
            <Text>log out</Text>
          </TouchableOpacity>
          <Modal isVisible={isLogoutModalVisible}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                are you sure you want to log out?
              </Text>
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={confirmLogout}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={cancelLogout}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>go back</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body_text: {
    color: "#FFFFFF",
  },
  logout_button: {
    color: "#151515",
    backgroundColor: "#C54646",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  modalContainer: {
    backgroundColor: "#151515",
    padding: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
    color: "#FFFFFF",
  },
  modalButtonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  modalButton: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#0A9B97",
    alignItems: "center",
    marginVertical: 8,
  },
  modalButtonText: {
    color: "#151515",
    fontWeight: "bold",
  },
});
