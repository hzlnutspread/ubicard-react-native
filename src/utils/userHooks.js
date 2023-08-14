import { useState, useEffect } from "react";
import { validateUser, validateUserPoints } from "./userUtils";
import { useNavigation } from "@react-navigation/native";

export const useAuthenticatedUser = (pageTitle) => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await validateUser(navigation);
      if (data) {
        setData(data);
        setIsLoading(false);
        console.log(data);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return { data, setData, isLoading, setIsLoading };
};

export const useAuthenticatedUserPoints = (pageTitle) => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await validateUserPoints(navigation);
      if (data) {
        setData(data);
        setIsLoading(false);
        console.log(data);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return { data, setData, isLoading, setIsLoading };
};
