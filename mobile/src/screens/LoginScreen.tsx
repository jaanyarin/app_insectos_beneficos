import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

// IMPORTANT: Replace with your local IP for physical device testing
const API_URL = 'http://10.13.18.117:9000/api';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    setLoading(true);
    try {
      console.log('Attempting login to:', `${API_URL}/auth/login`);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email.trim(),
        password: password,
      });

      console.log('Server Response Data:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.user) {
        const userName = response.data.user.nombreCompleto || 'Usuario';
        Alert.alert('Éxito', `Bienvenido ${userName}`);
        // Here you would navigate to the Home screen
      } else {
        console.warn('Login success but user data is missing:', response.data);
        Alert.alert('Error', 'El servidor no devolvió los datos del usuario correctamente.');
      }
      
    } catch (error: any) {
      console.error('Login Error details:', error);
      
      let message = 'Error de conexión con el servidor';
      if (error.response) {
        // The server responded with a status code outside the range of 2xx
        console.error('Response Error Data:', error.response.data);
        message = error.response.data.message || `Error del servidor (${error.response.status})`;
      } else if (error.request) {
        // The request was made but no response was received
        message = 'No se pudo contactar al servidor. Verifica que estés en la misma red.';
      }
      
      Alert.alert('Error de Acceso', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.content}
            >
              <View style={styles.header}>
                <Text style={styles.logoText}>V</Text>
                <Text style={styles.brandName}>Grupo Vanguard</Text>
                <Text style={styles.brandSubName}>Internacional</Text>
              </View>

              <View style={styles.card}>
                <Text style={styles.title}>ACCESO</Text>

                <TouchableOpacity style={styles.microsoftButton}>
                  <Image 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' }} 
                    style={styles.microsoftIcon} 
                  />
                  <Text style={styles.microsoftButtonText}>Microsoft Account</Text>
                </TouchableOpacity>

                <View style={styles.separatorContainer}>
                  <View style={styles.line} />
                  <Text style={styles.separatorText}>OR</Text>
                  <View style={styles.line} />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Contraseña</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity 
                  style={[styles.continueButton, loading && styles.buttonDisabled]} 
                  onPress={handleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.continueButtonText}>Continuar</Text>
                  )}
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>¿No tienes cuenta? </Text>
                  <TouchableOpacity>
                    <Text style={styles.footerLink}>Regístrate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 80,
    color: '#fff',
    fontWeight: '100',
    marginBottom: -10,
  },
  brandName: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  brandSubName: {
    fontSize: 14,
    color: '#fff',
    letterSpacing: 2,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  microsoftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 20,
  },
  microsoftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  microsoftButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  footerLink: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
