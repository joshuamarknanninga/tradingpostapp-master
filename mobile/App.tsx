import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HelmetProvider } from "react-helmet-async";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ShopScreen from "./src/screens/ShopScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import MapScreen from "./src/screens/MapScreen";
import QuestsScreen from "./src/screens/QuestsScreen";

// Components
import WebNavbar from "./src/components/WebNavbar";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Shop: { shopId: string; name: string };
  AddItem: undefined;
  Map: undefined;
  Quests: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login — The Trading Post" }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home — The Trading Post" }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={({ route }) => ({ title: `${route.params.name} — Shop` })}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{ title: "Add Item — The Trading Post" }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Map — The Trading Post" }}
      />
      <Stack.Screen
        name="Quests"
        component={QuestsScreen}
        options={{ title: "Quests — The Trading Post" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const content = (
    <NavigationContainer>
      {Platform.OS === "web" ? (
        <View style={styles.webLayout}>
          <WebNavbar />
          <View style={styles.webContent}>
            <AppNavigator />
          </View>
        </View>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );

  return Platform.OS === "web" ? (
    <HelmetProvider>{content}</HelmetProvider>
  ) : (
    content
  );
}

const styles = StyleSheet.create({
  webLayout: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  webContent: {
    paddingTop: 60, // leaves space for the sticky navbar
    flex: 1,
  },
});
