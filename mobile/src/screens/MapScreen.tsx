import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Helmet } from "react-helmet";
import { GOOGLE_MAPS_API_KEY } from "@env";

// Only require react-native-maps on mobile
let MapView: any;
let Marker: any;
if (Platform.OS !== "web") {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
}

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

      {Platform.OS === "web" ? (
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={styles.map}
          src={`https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=37.7749,-122.4194&zoom=12`}
          allowFullScreen
        />
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 20, fontWeight: "bold", padding: 10 },
  map: { flex: 1, minHeight: 400 }
});
