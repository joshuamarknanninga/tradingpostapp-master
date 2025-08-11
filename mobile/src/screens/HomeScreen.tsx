import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { fetchItems } from "../services/itemService";
import { fetchShops } from "../services/shopService";
import XPBar from "../components/XPBar";
import StreakBadge from "../components/StreakBadge";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    fetchItems().then(setItems);
    fetchShops().then(setShops);

    api.post("/xp/login-streak", {}, { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => {
        setStreak(res.data.count);
        api.get("/auth/me", { headers: { Authorization: "Bearer USER_TOKEN" } })
          .then((userRes) => setXp(userRes.data.xp));
      });
  }, []);

  return (
    <View style={styles.container}>
      <StreakBadge count={streak} />
      <XPBar xp={xp} />

      <Text style={styles.header}>Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />

      <Text style={styles.header}>Shops</Text>
      {shops.map((shop) => (
        <TouchableOpacity
          key={shop._id}
          onPress={() => navigation.navigate("Shop", { shopId: shop._id, name: shop.name })}
        >
          <Text style={styles.shop}>{shop.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  shop: { fontSize: 16, color: "#4cafef", marginVertical: 5 }
});
