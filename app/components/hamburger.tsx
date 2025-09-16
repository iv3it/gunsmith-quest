import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { QuestParts } from "../types/types";
import { fetchQuestPartsList } from "../utils/questPartsList";
import CustomText from "./custom-text";
import CustomTitleText from "./custom-title-text";

export default function HamburgerMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [questParts, setQuestParts] = useState<QuestParts | undefined>(undefined);

  useEffect(() => {
    const fetchPartsList = async () => {
      try {
        const response = await fetchQuestPartsList();

        setQuestParts(response);
      } catch (error) {
        console.error('Axios error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartsList();
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu-outline" size={36} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.menuContainer}>
            {/* Close button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* Menu */}

            <CustomTitleText className="text-xl text-white mb-4">Parts:</CustomTitleText>
            <FlatList
              data={questParts?.parts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => 
                <View className="border-b border-[#424242] max-h-24">
                  <Link href={`/part/${item}`} onPress={() => setMenuVisible(false)} className="text-white py-3">
                    <CustomTitleText className="text-white mb-4">Part {item}</CustomTitleText>
                  </Link>
                </View>
              }
            />

            <Link href="/credits" onPress={() => setMenuVisible(false)} className="py-5 border-y border-[#aaa]">
              <CustomTitleText className="text-xl text-white mb-4">Credits</CustomTitleText>
            </Link>

            {/* Footer */}
            <View className="py-5">
              <CustomText className="text-xs text-[#aaa]">© 2025</CustomText>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  menuContainer: {
    height: "60%",
    backgroundColor: "#1c1c1c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});
