import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { fetchItems } from "../services/itemService";
import { fetchShops } from "../services/shopService";
import XPBar from "../components/XPBar";
import StreakBadge from "../components/StreakBadge";
import LevelUpPopup from "../components/LevelUpPopup";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import ConfettiCannon from "react-native-confetti-cannon";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const confettiRef = useRef<any>(null);
  const tapCount = useRef(0);

  useEffect(() => {
    fetchItems().then(setItems);
    fetchShops().then(setShops);

    api.post("/xp/login-streak", {}, { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => {
        setStreak(res.data.count);
        api.get("/auth/me", { headers: { Authorization: "Bearer USER_TOKEN" } })
          .then((userRes) => {
            const newXp = userRes.data.xp;
            const newLevel = Math.floor(newXp / 100);

            if ([3, 7, 30].includes(res.data.count)) {
              triggerCelebration();
            }

            if (newLevel > level) {
              setLevel(newLevel);
              setPopupVisible(true);
              triggerCelebration();
              playSound();
            }

            setXp(newXp);
          });
      });
  }, []);

  const triggerCelebration = () => {
    confettiRef.current?.start();
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require("../../assets/level-up.mp3"));
    await sound.playAsync();
  };

  const boostXP = async () => {
    await api.post("/xp/gain-demo", { amount: 150 }, { headers: { Authorization: "Bearer USER_TOKEN" } });
    api.get("/auth/me", { headers: { Authorization: "Bearer USER_TOKEN" } })
      .then((res) => setXp(res.data.xp));
  };

  const handleSecretTap = () => {
    tapCount.current += 1;
    if (tapCount.current >= 5) {
      boostXP();
      tapCount.current = 0;
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleSecretTap}>
        <StreakBadge count={streak} />
      </Pressable>
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
          onPress={() => {
            navigation.navigate("Shop", { shopId: shop._id, name: shop.name });
            api.post("/xp/gain-demo", { amount: 15 }, { headers: { Authorization: "Bearer USER_TOKEN" } });
          }}
        >
          <Text style={styles.shop}>{shop.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Floating Add Item Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <ConfettiCannon ref={confettiRef} count={150} origin={{ x: 200, y: 0 }} fadeOut />
      <LevelUpPopup visible={popupVisible} level={level} onClose={() => setPopupVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  shop: { fontSize: 16, color: "#4cafef", marginVertical: 5 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4cafef",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 }
  }
});
