import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import fetchSongs from "../data/fetchSongs";
import fetchArtists from "../data/fetchArtists";

const SpotifyDisplay = (props) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  const getSongs = async () => {
    try {
      console.log("Token received for songs: ", props.token.accessToken);
      const result = await fetchSongs(props.token.accessToken);
      setSongs(result.items); 
    } catch (error) {
      console.error("Error fetching songs: ", error);
    }
  };

  const getArtists = async () => {
    try {
      console.log("Token received for artists: ", props.token.accessToken);
      const result = await fetchArtists(props.token.accessToken);
      setArtists(result.artists.items); 
      console.log("Artists received: ", result);
    } catch (error) {
      console.error("Error fetching artists: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSongs();
      await getArtists();
      setLoading(false); 
    };
    fetchData();
  }, []);

  if (!fontsLoaded) {
    console.log("Fonts not Loaded");
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text>Fetching your songs...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.savedSongsTitle}>Your Saved Tracks</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.track.id.toString()}
        renderItem={({ item }) => {
          const albumImage = item.track.album?.images?.[0]?.url || 'https://via.placeholder.com/100';
          return (
            <View style={styles.songItem}>
              <Image source={{ uri: albumImage }} style={styles.albumImage} />
              <Text style={styles.songTitle}>{item.track.name}</Text>
              <Text style={styles.artistName}>{item.track.artists[0].name}</Text>
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />

      <Text style={styles.savedSongsTitle}>Your Followed Artists</Text>
      <FlatList
        data={artists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const artistImage = item.images?.[0]?.url || 'https://via.placeholder.com/100';
          return (
            <View style={styles.songItem}>
              <Image source={{ uri: artistImage }} style={styles.albumImage} />
              <Text style={styles.songTitle}>{item.name}</Text>
              <Text style={styles.artistName}>Followers: {item.followers?.total || 0}</Text>
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
  savedSongsTitle: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
    marginVertical: 10,
  },
  songItem: {
    padding: 10,
    alignItems: "center",
  },
  songTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_400Regular",
    width: 120,
    textAlign: "center",
  },
  artistName: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Montserrat_400Regular",
    textAlign: "center",
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  horizontalList: {
    paddingVertical: 10,
  },
});

export default SpotifyDisplay;
