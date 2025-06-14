import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../api/api';
import { useNavigation } from '@react-navigation/native';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CreateOccurrenceScreen() {
  const [descricao, setDescricao] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [opacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    if (Platform.OS === 'web') {
      const interval = setInterval(() => {
        const coords = localStorage.getItem('coords');
        if (coords) {
          const parsed = JSON.parse(coords);
          setLatitude(parsed.lat);
          setLongitude(parsed.lng);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const enviar = async () => {
    if (!descricao || latitude === null || longitude === null) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione o local no mapa');
      return;
    }
    try {
      await api.post('/ocorrencias', {
        descricao,
        latitude,
        longitude,
      });
      Alert.alert('Sucesso', 'Ocorrência registrada');
      setDescricao('');
      setLatitude(null);
      setLongitude(null);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar');
    }
  };

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);
    setLatitude(data.lat);
    setLongitude(data.lng);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.card, { opacity }]}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          style={styles.input}
          placeholder="Descreva o problema"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Selecione a localização no mapa</Text>
        {Platform.OS === 'web' ? (
          <iframe
            title="Mapa"
            src={require('../../assets/map.html')}
            style={{ width: '100%', height: 250, borderRadius: 10 }}
          />
        ) : (
          <WebView
            originWhitelist={['*']}
            source={require('../../assets/map.html')}
            onMessage={handleMessage}
            style={styles.map}
          />
        )}

        {latitude && longitude && (
          <Text style={styles.coords}>
            Coordenadas: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </Text>
        )}

        <AnimatedTouchable style={styles.button} onPress={enviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </AnimatedTouchable>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Voltar</Text>
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
    width: '100%',
    maxWidth: 400,
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
  map: {
    width: '100%',
    height: 250,
    marginTop: 12,
    borderRadius: 10,
  },
  coords: {
    color: '#4CAF50',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center'
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