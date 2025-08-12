import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Helmet } from "react-helmet";

export default function QuestsScreen() {
  const [quests, setQuests] = useState([
    { id: 1, title: "List 5 new items", completed: false },
    { id: 2, title: "Make a trade", completed: false },
    { id: 3, title: "Log in 7 days in a row", completed: true }
  ]);

  const toggleQuest = (id: number) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <Helmet>
          <title>Quests — The Trading Post</title>
        </Helmet>
      )}
      <Text style={styles.header}>Your Quests</Text>
      {quests.map((quest) => (
        <TouchableOpacity
          key={quest.id}
          style={[styles.quest, quest.completed && styles.completed]}
          onPress={() => toggleQuest(quest.id)}
        >
          <Text style={styles.questText}>
            {quest.completed ? "✅" : "⬜"} {quest.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  quest: {
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 10
  },
  completed: {
    backgroundColor: "#d4f7d4"
  },
  questText: {
    fontSize: 16
  }
});
