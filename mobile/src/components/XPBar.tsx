import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function XPBar({ xp }: { xp: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming((xp % 100) / 100, { duration: 800 });
  }, [xp]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, animatedStyle]} />
      <Text style={styles.label}>XP: {xp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10
  },
  fill: {
    backgroundColor: "#4cafef",
    height: "100%"
  },
  label: {
    position: "absolute",
    width: "100%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold"
  }
});
