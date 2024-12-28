import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from './types'; // Import your types
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant';

const BottomNav = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const ICON_SIZE = 28;
  const ICON_COLOR = COLORS.light.text;

  return (
    <View style={styles.navbar}>
      {/* Home Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}
      >
        <MaterialIcons name="home" size={ICON_SIZE} color={ICON_COLOR} />
        <Text style={styles.iconLabel}>Home</Text>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Search')}
      >
        <MaterialIcons name="search" size={ICON_SIZE} color={ICON_COLOR} />
        <Text style={styles.iconLabel}>Search</Text>
      </TouchableOpacity>

      {/* Trending Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Trending')}
      >
        <MaterialCommunityIcons name="fire" size={ICON_SIZE} color={ICON_COLOR} />
        <Text style={styles.iconLabel}>Trending</Text>
      </TouchableOpacity>

      {/* Saved Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Saved')}
      >
        <MaterialIcons name="bookmark-outline" size={ICON_SIZE} color={ICON_COLOR} />
        <Text style={styles.iconLabel}>Saved</Text>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <MaterialIcons name="person-outline" size={ICON_SIZE} color={ICON_COLOR} />
        <Text style={styles.iconLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.light.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.light.background,
    zIndex: 100,
    height: 60, // Replace with an appropriate value
    paddingVertical: SPACING.small,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: FONT_SIZES.small,
    color: COLORS.light.text,
    marginTop: SPACING.small / 2,
  },
});

export default BottomNav;
