import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StreakBadge({ count }: { count: number }) {
  const getColor = () => {
    if (count >= 30) return "#FFD700"; // gold
    if (count >= 7) return "#C0C0C0";  // silver
    if (count >= 3) return "#cd7f32";  // bronze
    return "#bbb";
  };

  return (
    <View style={[styles.badge, { backgroundColor: getColor() }]}>
      <Text style={styles.text}>🔥 {count}d Streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10
  },
  text: {
    color: "#fff",
    fontWeight: "bold"
  }
});
