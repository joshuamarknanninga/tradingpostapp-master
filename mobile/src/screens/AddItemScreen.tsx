import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import api from "../services/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "AddItem">;

export default function AddItemScreen({ navigation }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handlePost = async () => {
    if (!title || !price || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);

      if (imageUri) {
        const fileName = imageUri.split("/").pop() || "photo.jpg";
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image`;
        // @ts-ignore
        formData.append("image", { uri: imageUri, name: fileName, type });
      }

      await api.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer USER_TOKEN"
        }
      });

      // XP boost for demo
      await api.post(
        "/xp/gain-demo",
        { amount: 30 },
        { headers: { Authorization: "Bearer USER_TOKEN" } }
      );

      Alert.alert("Success", "Item posted!");
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not post item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Post a New Item</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 200, marginVertical: 10, borderRadius: 10 }}
        />
      )}

      <Button title={loading ? "Posting..." : "Post Item"} onPress={handlePost} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  imageButton: {
    backgroundColor: "#4cafef",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },
  imageButtonText: { color: "#fff", fontWeight: "bold" }
});
