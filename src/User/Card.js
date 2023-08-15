import { StyleSheet, Text, SafeAreaView, Button } from "react-native";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import { useTabPressListener } from "../utils/useTabPressListener";

const CardPage = () => {
  const { userData, setUserData } = useUser();
  const { fetchData } = useTabPressListener();

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
      <Text style={styles.body_text}>
        Card Page for {userData.user.first_name}
      </Text>
      {userData.user.scanned_in ? (
        <Text style={styles.body_text}>You are scanned in</Text>
      ) : (
        <Text style={styles.body_text}>You are scanned out</Text>
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
