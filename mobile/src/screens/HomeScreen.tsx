import React, { useEffect, useState, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
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

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const confettiRef = useRef<any>(null);

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

            // Streak milestone celebration
            if ([3, 7, 30].includes(res.data.count)) {
              triggerCelebration();
            }

            // Level-up detection
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

      <ConfettiCannon ref={confettiRef} count={150} origin={{ x: 200, y: 0 }} fadeOut />
      <LevelUpPopup visible={popupVisible} level={level} onClose={() => setPopupVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  shop: { fontSize: 16, color: "#4cafef", marginVertical: 5 }
});
