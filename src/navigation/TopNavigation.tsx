import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { RootStackNavigationProp } from './types';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant';
import DynamicTitle from './DynamicTitle';

const TopNav = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const currentRoute = useNavigationState((state) => {
    if (!state || !state.routes || state.index === undefined) {
      return 'Home';
    }
    return state.routes[state.index].name;
  });

  return (
    <View style={styles.navbar}>
      <View style={styles.leftSection}>
        <DynamicTitle title={currentRoute} />
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notification')}
        >
          <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.light.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('RecentScreen')}
        >
          <MaterialCommunityIcons name="progress-clock" size={24} color={COLORS.light.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={COLORS.light.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.border,
    backgroundColor: COLORS.light.background,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.light.text,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: SPACING.medium,
  },
});

export default TopNav;