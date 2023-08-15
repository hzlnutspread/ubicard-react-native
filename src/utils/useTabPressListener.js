import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";
import { validateUser } from "./userUtils";

export const useTabPressListener = (callback) => {
  const navigation = useNavigation();
  const { userData, setUserData } = useUser();

  const fetchData = async () => {
    const data = await validateUser(navigation);
    if (data) {
      setUserData(data);
      console.log(data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", fetchData);
    return () => unsubscribe;
  }, [navigation]);

  return {
    fetchData,
  };
};
