import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, Image} from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import fetchSongs from "../data/fetchSongs";
import { SafeAreaView } from "react-native-web";



const SpotifyDisplay = (props) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
   console.log("Fonts not Loaded");
  }

  const getSongs = async () => {
    try {
      console.log("Token received: ", props.token.accessToken);
      const result = await fetchSongs(props.token.accessToken);
      setSongs(result.items); // Store the fetched songs in state
    } catch (error) {
      console.error("Error fetching songs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Component mounted, calling getSongs");
    getSongs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text>Fetching your songs...</Text>
      </View>
    );
  }

  return (
    <View> 
    <Text style = {styles.savedSongsTitle}>Your Saved Tracks</Text>
    <FlatList
    data={songs}
    keyExtractor={(item) => item.track.id.toString()}
    renderItem={({ item }) => {
      // Log to check the structure of album images
      console.log("Album data:", item.track.album);
      
      // Check if album images are available
      const albumImage = item.track.album?.images?.[0]?.url || 'https://via.placeholder.com/100'; // Fallback image

      return (
        <View style={styles.songItem}>
          <Image
            source={{ uri: albumImage }}
            style={styles.albumImage}
          />
          <Text style={styles.songTitle}>{item.track.name}</Text>
          <Text style={styles.artistName}>{item.track.artists[0].name}</Text>
        </View>
      );
    }}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.horizontalList}
  />
  </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  savedSongsTitle:{
    fontSize: 30,
    fontFamily: "Montserrat_400Regular",
    fontWeight:"bold"
  },
  songItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  songTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_400Regular",
    width: 120
  },
  artistName: {
    fontSize: 16,
    color: "#555",
     fontFamily: "Montserrat_400Regular",
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  regularFont: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
  },
});

export default SpotifyDisplay;
