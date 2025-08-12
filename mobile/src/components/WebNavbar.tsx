import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";

export default function WebNavbar() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  // Get active route name
  const currentRouteName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route?.name || "";
  });

  // Navigation links
  const navItems = [
    { label: "Home", route: "Home" },
    { label: "Map", route: "Map" },
    { label: "Quests", route: "Quests" },
    { label: "Add Item", route: "AddItem" },
  ];

  // Mobile breakpoint
  const isMobile = width < 768;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.navbar, isMobile && styles.navbarMobile]}>
        <Text style={styles.brand}>The Trading Post</Text>

        {/* Links for larger screens */}
        {!isMobile && (
          <View style={styles.links}>
            {navItems.map((item) => {
              const isActive = currentRouteName === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  onPress={() => navigation.navigate(item.route as never)}
                >
                  <Text style={[styles.link, isActive && styles.activeLink]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Condensed menu for mobile */}
        {isMobile && (
          <View style={styles.mobileLinks}>
            {navItems.map((item) => {
              const isActive = currentRouteName === item.route;
              return (
                <TouchableOpacity
                  key={item.route}
                  onPress={() => navigation.navigate(item.route as never)}
                >
                  <Text style={[styles.mobileLink, isActive && styles.activeMobileLink]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#222",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  navbarMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  brand: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  links: {
    flexDirection: "row",
    gap: 16,
  },
  link: {
    color: "#bbb",
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    transition: "all 0.2s ease-in-out",
  },
  activeLink: {
    color: "#fff",
    backgroundColor: "#4cafef",
  },
  mobileLinks: {
    flexDirection: "column",
    marginTop: 8,
    width: "100%",
  },
  mobileLink: {
    color: "#bbb",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    width: "100%",
  },
  activeMobileLink: {
    color: "#fff",
    backgroundColor: "#4cafef",
  },
});
