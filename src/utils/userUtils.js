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

// TESTING THE OTHER END POINTS HERE
export const validateUserDashboard = async (navigation) => {
  return await validateUserWithEndpoint(navigation, "dashboard");
};

export const validateUserCard = async (navigation) => {
  return await validateUserWithEndpoint(navigation, "card");
};

export const validateUserInfo = async (navigation) => {
  return await validateUserWithEndpoint(navigation, "info");
};

export const validateUserProfile = async (navigation) => {
  return await validateUserWithEndpoint(navigation, "profile");
};

const validateUserWithEndpoint = async (navigation, endpoint) => {
  try {
    const jwtToken = await AsyncStorage.getItem("access_token_cookie");

    if (!jwtToken) {
      navigation.navigate("Login");
      return null;
    }

    const response = await fetch(
      `https://api.oystergroup.org/flask/user/validate/${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
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
    console.error(
      `An error occurred while validating user for ${endpoint}:`,
      error
    );
    return null;
  }
};
