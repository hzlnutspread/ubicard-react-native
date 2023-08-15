import { useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export const useTabPressListener = (validateFunction) => {
  const navigation = useNavigation();
  const { setUserData } = useUser();

  const fetchData = async () => {
    const data = await validateFunction(navigation);
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
