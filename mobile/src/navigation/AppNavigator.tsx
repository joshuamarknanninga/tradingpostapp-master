// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import MapScreen from '../screens/MapScreen';
import ChatScreen from '../screens/ChatScreen';
import StorefrontScreen from '../screens/StorefrontScreen';
import QuestsScreen from '../screens/QuestsScreen';

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
  Map: undefined;
  Chat: undefined;
  Storefront: { shopId: string };
  Quests: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Trading Post' }} />
        <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Add Item' }} />
        <Stack.Screen name="Map" component={MapScreen} options={{ title: 'Marketplace Map' }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="Storefront" component={StorefrontScreen} options={{ title: 'Shop' }} />
        <Stack.Screen name="Quests" component={QuestsScreen} options={{ title: 'Quests' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
