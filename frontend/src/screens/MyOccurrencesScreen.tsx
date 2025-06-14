import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api/api';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function MyOccurrencesScreen() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [opacity] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const load = async () => {
      const res = await api.get('/ocorrencias');
      setOcorrencias(res.data);
    };
    load();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.card, { opacity }]}>        
        <FlatList
          data={ocorrencias}
          //@ts-ignore
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.label}>{item.descricao}</Text>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          )}
        />

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
  item: {
    marginBottom: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    paddingBottom: 8
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    color: '#BBB',
    fontSize: 14,
  },
  link: {
    marginTop: 16,
    color: '#4CAF50',
    textAlign: 'center'
  }
});
