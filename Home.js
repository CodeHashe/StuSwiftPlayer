import { useState, useEffect } from 'react';

import { StyleSheet, Text, View} from 'react-native';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}> Home Screen </Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
  },
});