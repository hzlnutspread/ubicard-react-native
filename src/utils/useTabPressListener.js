import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

export const useTabPressListener = (validateFunction) => {
  const { setUserData } = useUser();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await validateFunction(navigation);
    if (data) {
      setUserData(data);
      setIsLoading(false);
      console.log(data);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", fetchData);
    return () => unsubscribe;
  }, [navigation]);

  return {
    isLoading,
    fetchData,
  };
};
