import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { validateUserInfo } from "../utils/userUtils";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useTabPressListener } from "../utils/useTabPressListener";

const InfoCard = () => {
  const { userData } = useUser();
  const { isLoading, fetchData } = useTabPressListener(validateUserInfo);

  useEffect(() => {
    (async function () {
      await fetchData();
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0A9B97" />
      ) : (
        <Text style={styles.body_text}>
          {userData.message} for {userData.user.first_name}
        </Text>
      )}
    </SafeAreaView>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body_text: {
    color: "#FFFFFF",
  },
});
