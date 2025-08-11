import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import io from "socket.io-client";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const socket = io("http://localhost:5000");

type Props = NativeStackScreenProps<RootStackParamList, "Shop">;

export default function ChatScreen({ route }: Props) {
  const { shopId, name } = route.params;
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    api.get(`/chat/${shopId}`).then((res) => setMessages(res.data));

    socket.on(`chat-${shopId}`, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off(`chat-${shopId}`);
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { sender: "USER_ID", receiver: shopId, content: text });
    setText("");
  };

  // Gain XP for chatting
  api.post("/xp/gain-demo", { amount: 20 }, { headers: { Authorization: "Bearer USER_TOKEN" } })
    .then((res) => console.log("XP after chat:", res.data.xp));
    
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat with {name}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={item.sender === "USER_ID" ? styles.sent : styles.received}>{item.content}</Text>
        )}
      />
      <View style={styles.inputRow}>
        <TextInput style={styles.input} value={text} onChangeText={setText} placeholder="Type a message..." />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sent: { alignSelf: "flex-end", backgroundColor: "#4cafef", padding: 5, margin: 2, borderRadius: 5 },
  received: { alignSelf: "flex-start", backgroundColor: "#ddd", padding: 5, margin: 2, borderRadius: 5 },
  inputRow: { flexDirection: "row", alignItems: "center" },
  input: { flex: 1, borderWidth: 1, marginRight: 5, padding: 5, borderRadius: 5 }
});
