import AsyncStorage from "@react-native-async-storage/async-storage";

export const validateUser = async (navigation) => {
  try {
    const jwtToken = await AsyncStorage.getItem("access_token_cookie");

    if (!jwtToken) {
      navigation.navigate("Login");
      return null;
    }

    const response = await fetch(
      `https://api.oystergroup.org/flask/user/validate`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      }
    );

    if (response.status === 401) {
      navigation.navigate("Login");
      return null;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("An error occurred while validating user:", error);
    return null;
  }
};

export const validateUserPoints = async (navigation) => {
  try {
    const jwtToken = await AsyncStorage.getItem("access_token_cookie");

    if (!jwtToken) {
      navigation.navigate("Login");
      return null;
    }

    const response = await fetch(
      `https://api.oystergroup.org/flask/user/validate-points`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        credentials: "include",
      }
    );

    if (response.status === 401) {
      navigation.navigate("Login");
      return null;
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("An error occurred while validating user:", error);
    return null;
  }
};
