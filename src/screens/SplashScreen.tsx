import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant'; // Assuming constants are in this file

type Props = {
  setScreen: (screen: 'login' | 'register') => void;
};

const SplashScreen: React.FC<Props> = ({ setScreen }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unfolding at the moment</Text>
      <Text style={styles.subtitle}>Start your journey now</Text>
      <TouchableOpacity style={styles.button} onPress={() => setScreen('login')}>
        <Ionicons name="log-in-outline" size={20} color={COLORS.light.background} />
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonSecondary} onPress={() => setScreen('register')}>
        <Ionicons name="person-add-outline" size={20} color={COLORS.light.background} />
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: FONT_SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.light.text,
    marginBottom: SPACING.large,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.light.secondaryText,
    marginBottom: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.light.primary,
    paddingVertical: SPACING.xmedium,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.medium,
  },
  buttonSecondary: {
    backgroundColor: COLORS.light.primary,
    paddingVertical: SPACING.xmedium,
    width: '100%',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.small,
  },
  buttonText: {
    color: COLORS.light.background,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    marginLeft: SPACING.small,
  },
});

export default SplashScreen;
