import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Button from '../components/button';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import CustomInput from '../components/customInput';
import { router } from 'expo-router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = () => {
    let valid = true;
    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Your email is not valid');
      valid = false;
      showMessage({
        message: 'Invalid Email',
        description: 'Please enter a valid email address.',
        type: 'warning',
        icon: 'warning',
        position: 'top',
      });
    } else {
      setEmailError('');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleRegister = async () => {
    if (handleValidation()) {
      try {
        setLoading(true);
        router.navigate('/Auth/login');
      } catch (error) {
        showMessage({
          message: `${error}`,
          hideStatusBar: true,
          type: 'danger',
          icon: 'danger',
          duration: 6000,
        });
      } finally {
        setLoading(false);
        setEmail('');
        setPassword('');
        setUsername('');
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <FlashMessage position="top" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 30,
            paddingHorizontal: 30,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#E02323' }}>
            Let's sign you up.{' '}
          </Text>
          <Text style={{ paddingVertical: 4 }}>Welcome.</Text>

          <View style={{ paddingTop: 25, paddingBottom: 100 }}>
            <Text style={styles.label}>Full Name</Text>
            <CustomInput
              label={'Your name'}
              icon2={'account-circle-outline'}
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Email</Text>
            <CustomInput
              label={'Your email'}
              icon2={'email-outline'}
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />
            {emailError ? (
              <Text style={{ color: 'red' }}>{emailError}</Text>
            ) : null}

            <Text style={styles.label}>Password</Text>
            <CustomInput
              label={'Enter password'}
              icon2={'lock-outline'}
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              error={passwordError}
              icon1={showPassword ? 'eye-outline' : 'eye-off-outline'}
              onPress={togglePasswordVisibility}
              value={password}
            />
            {passwordError ? (
              <Text style={{ color: 'red' }}>{passwordError}</Text>
            ) : null}
          </View>

          <Button
            title={'Sign up'}
            onPress={handleRegister}
            loading={loading}
          />

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 20,
            }}
          >
            <Text>Already a member? </Text>
            <TouchableOpacity onPress={() => router.navigate('/Auth/login')}>
              <Text
                style={{ color: '#E02323', fontWeight: '500', marginLeft: 2 }}
              >
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: '#333',
  },
});
