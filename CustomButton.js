import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity
  } from 'react-native';

export default function CustomButton(props) {
    const loginBtnPressed=()=>{
    }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={loginBtnPressed}>
        <Text style={{color:'white'}}> Custom Button {props.bgcolor} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:30,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
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
    // padding: 10,
    marginTop:10
  },
});