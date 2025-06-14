import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import api from '../api/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const register = async () => {
    try {
      await api.post('/users/register', { email, password });
      Alert.alert('Sucesso', 'Cadastro realizado');
      navigation.replace('Login');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível registrar');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.card, { opacity }]}>        
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <AnimatedTouchable style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Registrar</Text>
        </AnimatedTouchable>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem conta? Entrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#1E1E1E',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'stretch'
  },
  label: {
    color: '#CCC',
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#2B2B2B',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  link: {
    marginTop: 16,
    color: '#4CAF50',
    textAlign: 'center'
  }
});
