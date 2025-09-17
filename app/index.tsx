import { fetchQuestPartsList } from "@/utils/questPartsList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const lastOpenedPartId = await AsyncStorage.getItem('lastOpenedPartId');      
        
        if (lastOpenedPartId) {
          router.replace({
            pathname: "/part/[id]",
            params: { id: lastOpenedPartId },
          });
        } else {
          const response = await fetchQuestPartsList();
          const firstPartId = response.parts[0];
          if (firstPartId) {
            router.replace({
              pathname: "/part/[id]",
              params: { id: firstPartId },
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch parts:", error);
      }
    };

    load();
  }, []);

  return null
}