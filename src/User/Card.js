import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { validateUserCard } from "../utils/userUtils";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import { useTabPressListener } from "../utils/useTabPressListener";

const CardPage = () => {
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const { fetchData } = useTabPressListener(validateUserCard);

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

export default CardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
  },
  body_text: {
    color: "#FFFFFF",
  },
});
