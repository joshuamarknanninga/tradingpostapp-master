import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ route }: Props) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    api.get("/auth/me", { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => setProfile(res.data))
      .catch(console.error);

    // Gain XP for visiting profile
    api.post("/xp/gain-demo", { amount: 10 }, { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => console.log("XP after profile view:", res.data.xp))
      .catch(console.error);
  }, []);

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{profile.name}</Text>
      <Text>Email: {profile.email}</Text>
      <Text>XP: {profile.xp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 }
});
