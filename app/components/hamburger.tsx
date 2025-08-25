import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
            <Text style={styles.menuTitle}>Menu</Text>
            <Text style={styles.menuItem}>Item 1</Text>

            <View style={{ flex: 1 }} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025</Text>
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
    fontWeight: "bold",
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
