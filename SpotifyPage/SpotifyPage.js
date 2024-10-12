import React, { useState, useEffect } from 'react';
import { Button, View, StyleSheet, Alert, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import SpotifyDisplay from './screens/SpotifyDisplay';


const CLIENT_ID = '60e52b498853481ca6d00f6ca3d9ed6d';
const SCOPES = ['user-read-private', 'user-read-email', 'user-library-read'];

export default function SpotifyLogin() {
  const [accessToken, setAccessToken] = useState(null);

  
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
      responseType: AuthSession.ResponseType.Token, // Implicit Grant Flow
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      if (access_token) {
        setAccessToken(access_token);
        Alert.alert('Login Successful!', 'Access Token received.');
      } else {
        Alert.alert('Login Failed', 'No access token received.');
      }
    }
  }, [response]);

  const fetchUserProfile = async (token) => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch user profile.');
      }
      const data = await res.json();
      console.log('User Profile:', data);
      Alert.alert('User Profile', `Welcome, ${data.display_name}!`);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to fetch user profile.');
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchUserProfile(accessToken);
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      {!accessToken ? (
        <Button
          title="Login with Spotify"
          onPress={() => {
            promptAsync();
          }}
          disabled={!request}
        />
      ) : (
        <SpotifyDisplay token = {{accessToken}}/>
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
  token: {
    marginTop: 20,
    fontSize: 12,
    color: 'gray',
  },
  profileContainer: {
    alignItems: 'center',
  },
});
