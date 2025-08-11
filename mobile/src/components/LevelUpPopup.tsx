import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

export default function LevelUpPopup({ visible, onClose, level }: { visible: boolean; onClose: () => void; level: number }) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>🎉 Level Up!</Text>
          <Text style={styles.level}>You reached Level {level}!</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Awesome!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.6)" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15, alignItems: "center", width: 250 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  level: { fontSize: 18, marginBottom: 15 },
  button: { backgroundColor: "#4cafef", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});
