import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export const useTabPressListener = (callback) => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", callback);

    return unsubscribe;
  }, [navigation, callback]);
};
