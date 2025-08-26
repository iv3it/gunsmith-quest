import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "./custom-text";
import CustomTitleText from "./custom-title-text";

export default function HamburgerMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <Ionicons name="menu-outline" size={36} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
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
            <CustomTitleText style={styles.menuTitle}>Menu</CustomTitleText>
            <CustomTitleText style={styles.menuItem}>Item 1</CustomTitleText>

            <View style={{ flex: 1 }} />

            {/* Footer */}
            <View style={styles.footer}>
              <CustomText style={styles.footerText}>© 2025</CustomText>
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
  menuTitle: {
    fontSize: 20,
    color: "white",
    marginBottom: 16,
  },
  menuItem: {
    fontSize: 16,
    color: "white",
    paddingVertical: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 4,
  },
});
