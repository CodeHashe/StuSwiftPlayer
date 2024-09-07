import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const loginBtnPressed = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.signinBody}>
      <View style={styles.signinBox}>
        <Text style={styles.heading2}>StuSwift</Text>
        <Text style={styles.heading3}>Welcome Back!</Text>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
          placeholder="Enter Your Email"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
        />
        <TouchableOpacity style={styles.button} onPress={loginBtnPressed}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Sign Up')}>
          <Text style={styles.link}>Don't have an Account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signinBody: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(2px)',
    transition: 'all 0.2s ease-in',
  },
  signinBox: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: '5%',
    maxWidth: '400px',
    alignItems: 'center',
    textAlign: 'center'
  },
  heading2: {
    margin: '2%',
    fontSize: 24,
    color: '#40403F',
  },
  heading3: {
    margin: '2%',
    fontSize: 18,
    color: '#797979',
    fontWeight: 'normal',
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: '2%',
    marginTop: '2%',
    borderRadius: 3,
    borderColor: '#797979',
    borderWidth: 1,
    paddingLeft: '2%',
  },
  button: {
    backgroundColor: '#40403F',
    color: 'white',
    width: '100%',
    height: 40,
    borderRadius: 5,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 14,
    margin: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
