import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { validateUser, validateUserPoints } from "./userUtils";

export const useAuthenticatedUser = () => {
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

export const useAuthenticatedUserPoints = () => {
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
