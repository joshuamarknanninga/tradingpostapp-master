import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Helmet } from "react-helmet";

export default function MapScreen() {
  const sampleMarkers = [
    { id: 1, title: "Antique Shop", lat: 37.7749, lng: -122.4194 },
    { id: 2, title: "Vintage Books", lat: 37.7849, lng: -122.4094 }
  ];

  return (
    <View style={styles.container}>
      {Platform.OS === "web" && (
        <Helmet>
          <title>Map — The Trading Post</title>
        </Helmet>
      )}
      <Text style={styles.header}>Marketplace Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {sampleMarkers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", padding: 10 },
  map: { flex: 1 }
});
