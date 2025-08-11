import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Shop">;

export default function ShopScreen({ route }: Props) {
  const { shopId, name } = route.params;
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api.post("/xp/gain-demo", { amount: 15 }, { headers: { Authorization: "Bearer USER_TOKEN" } })
    .then((res) => console.log("XP after visiting shop:", res.data.xp));
    
    api.get(`/items`).then((res) => {
      setItems(res.data.filter((item: any) => item.owner?._id === shopId));
    });

  }, [shopId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 }
});
