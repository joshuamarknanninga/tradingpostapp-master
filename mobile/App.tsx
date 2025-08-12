import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ShopScreen from "./src/screens/ShopScreen";
import AddItemScreen from "./src/screens/AddItemScreen";
import MapScreen from "./src/screens/MapScreen";
import QuestsScreen from "./src/screens/QuestsScreen";
import { Platform, View } from "react-native";
import { HelmetProvider } from "react-helmet-async";
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

function MainNavigator() {
  return (
    <>
      {Platform.OS === "web" && <WebNavbar />}
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
    </>
  );
}

export default function App() {
  const AppContent = (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );

  return Platform.OS === "web" ? (
    <HelmetProvider>{AppContent}</HelmetProvider>
  ) : (
    AppContent
  );
}
