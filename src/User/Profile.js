import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { validateUserProfile } from "../utils/userUtils";
import { useTabPressListener } from "../utils/useTabPressListener";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";

const ProfilePage = () => {
  const { userData } = useUser();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useTabPressListener(validateUserProfile);

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
      if (!userData) {
        return <Text>Error loading data or no data available.</Text>;
      }
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

  const handleLogout = async (e) => {
    e.preventDefault();
    const data = await logOut();
    AsyncStorage.removeItem("access_token_cookie");
    AsyncStorage.removeItem("refresh_token_cookie");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
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
});
