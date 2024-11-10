import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Pressable, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import SpotifyDisplay from './screens/SpotifyDisplay';

const CLIENT_ID = '60e52b498853481ca6d00f6ca3d9ed6d';
const SCOPES = ['user-read-private', 'user-read-email', 'user-library-read'];

export default function SpotifyLogin() {
  const [accessToken, setAccessToken] = useState(null);
  const [buttonOpacity, setButtonOpacity] = useState(1);

  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: true,
      }),
      responseType: AuthSession.ResponseType.Token,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      if (access_token) {
        setAccessToken(access_token);
      } else {
        Alert.alert('Login Failed', 'No access token received.');
      }
    }
  }, [response]);

  const fetchUserProfile = async () => {
    if (!accessToken) return;
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user profile.');
      }
      const data = await res.json();
      console.log('User Profile:', data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [accessToken]);

  return (
    <View style={styles.container}>
      {!accessToken ? (
        <Pressable
          style={[styles.button, { opacity: buttonOpacity }]}
          onPressIn={() => setButtonOpacity(0.5)}
          onPressOut={() => setButtonOpacity(1)}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image
            style={styles.image}
            source={require('../assets/Spotify_Primary_Logo_RGB_Green.png')}
          />
          <Text style={styles.text}>Login With Spotify</Text>
        </Pressable>
      ) : (
        <SpotifyDisplay token={{ accessToken }} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    borderRadius: 60,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    width: 264,
    height: 71,
  },
  image: {
    width: 56,
    height: 58,
    marginLeft: 16,
    marginRight: 14,
  },
  text: {
    color: 'white',
    fontFamily: 'montserrat',
    fontSize: 16,
  },
});
