import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

export default function ChatScreen({ route }: Props) {
  const { shopId } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    // Push locally
    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "me" }]);
    setText("");

    // Send to backend
    api.post(`/chat/${shopId}`, { content: text }, { headers: { Authorization: "Bearer USER_TOKEN" } })
      .catch((err) => console.error(err));

    // Gain XP for demo
    api.post("/xp/gain-demo", { amount: 20 }, { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => console.log("XP after chat:", res.data.xp))
      .catch(console.error);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={item.sender === "me" ? styles.myMsg : styles.theirMsg}>
            {item.text}
          </Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 10, marginRight: 10 },
  myMsg: { alignSelf: "flex-end", backgroundColor: "#d0f0c0", padding: 8, marginVertical: 4, borderRadius: 8 },
  theirMsg: { alignSelf: "flex-start", backgroundColor: "#f0f0f0", padding: 8, marginVertical: 4, borderRadius: 8 }
});
