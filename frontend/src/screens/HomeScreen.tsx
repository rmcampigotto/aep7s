import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.card, { opacity }]}>        
        <AnimatedTouchable
          style={styles.button}
          onPress={() => navigation.navigate('CreateOccurrence')}
        >
          <Text style={styles.buttonText}>Criar Ocorrência</Text>
        </AnimatedTouchable>

        <AnimatedTouchable
          style={styles.button}
          onPress={() => navigation.navigate('MyOccurrences')}
        >
          <Text style={styles.buttonText}>Minhas Ocorrências</Text>
        </AnimatedTouchable>
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
  button:{
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});