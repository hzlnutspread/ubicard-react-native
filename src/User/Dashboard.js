import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useAuthenticatedUser } from "../utils/userHooks";
import { useUser } from "../contexts/UserContext";
import { validateUser } from "../utils/userUtils";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useTabPressListener } from "../utils/useTabPressListener";

const DashboardPage = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useUser();

  const fetchData = async () => {
    const data = await validateUser(navigation);
    if (data) {
      setUserData(data);
      console.log("successfully fetched data on dashboard");
    }
  };

  useTabPressListener(fetchData);

  if (!userData) {
    return <Text>Error loading data or no data available.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.body_text}>
        Dashboard Page for {userData.user.first_name}
      </Text>
      {userData.user.scanned_in ? (
        <Text style={styles.body_text}>You are scanned in</Text>
      ) : (
        <Text style={styles.body_text}>You are scanned out</Text>
      )}
    </SafeAreaView>
  );
};

export default DashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body_text: {
    color: "#FFFFFF",
  },
});
