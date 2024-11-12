import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, SafeAreaView, TextInput, ScrollView } from "react-native";
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';
import fetchSongs from "../data/fetchSongs";
import fetchArtists from "../data/fetchArtists";
import fetchRecs from "../data/fetchRecs";

const SpotifyDisplay = (props) => {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, onChangeText] = React.useState('');

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Inter_400Regular, 
    Inter_700Bold
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

  const getRecs = async () => {
    try {
      const result = await fetchRecs(props.token.accessToken);
      setRecs(result); 
      console.log("Songs received: ", result);
    } catch (error) {
      console.error("Error fetching artists: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSongs();
      await getArtists();
      await getRecs();
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
    <SafeAreaView style={styles.container}>
      <ScrollView> 
        <View style={styles.topBox}>
          <Text style={styles.ScreenTitle}>Music</Text>
        </View>

        <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          /> 
        </View>

        <Text style={styles.savedSongsTitle}>Featured</Text> 
        <FlatList
          data={recs.playlists.items} // Access the 'items' array in 'playlists'
          keyExtractor={(item) => item.id.toString()} // Use 'id' for unique key
          renderItem={({ item }) => {
            const albumImage = item.images?.[0]?.url || 'https://via.placeholder.com/100';
            return (
              <View style={styles.songItem}>
                <Image source={{ uri: albumImage }} style={styles.albumImage} />
                <Text style={styles.songTitle}>{item.name}</Text>
              </View>
            );
          }}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

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
          bounces={false}
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
              </View>
            );
          }}
          bounces={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
  },

  ScreenTitle:{
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
    textAlign:"center"
  },

  loadingContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  savedSongsTitle: {
    fontSize: 25,
    fontFamily: "Inter_400Regular",
    marginVertical: 10,
  },
  songItem: {
    padding: 10,
    alignItems: "center",
    marginHorizontal: 0, // Removes margins from the sides of each item
  },
  songTitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    width: 120,
    textAlign: "center",
  },
  artistName: {
    fontSize: 13,
    color: "#555",
    fontFamily: "Inter_400Regular",
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
    paddingHorizontal: 0,  // Prevents extra padding on the horizontal axis
    marginHorizontal: 0,   // Prevents margin on the horizontal axis
    borderWidth: 0,
    borderColor: 'transparent'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  topBox: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SpotifyDisplay;
