import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { validateUserDashboard } from "../utils/userUtils";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useTabPressListener } from "../utils/useTabPressListener";

const DashboardPage = () => {
  const { userData } = useUser();
  const { isLoading, fetchData } = useTabPressListener(validateUserDashboard);

  useEffect(() => {
    (async function () {
      await fetchData();
      if (!userData) {
        return <Text>Error loading data or no data available.</Text>;
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0A9B97" />
      ) : (
        <Text style={styles.body_text}>
          {userData
            ? `${userData.message} for ${userData.user.first_name}`
            : "Error loading data or no data available."}
        </Text>
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
