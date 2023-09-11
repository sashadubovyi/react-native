import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();

  const handleDoneButtonPress = () => {
    const country = "Україна";
    const region = "Київська область";
    const selectedLocation = { latitude: 12.345, longitude: 67.89 };

    navigation.navigate("CreatePostsScreen", {
      country,
      region,
      selectedLocation,
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={{
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          mapType="standard"
          minZoomLevel={15}
          //   onMapReady={() => console.log("Map is ready")}
          //   onRegionChange={() => console.log("Region change")}
        >
          {location && (
            <Marker
              title="Ви зараз тут?"
              coordinate={location}
              description=""
            />
          )}
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  submitBtn: {
    zIndex: 10,
    width: 50,
    height: 40,
    marginLeft: 350,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    borderWidth: 1,
  },
});

export default MapScreen;
