import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from './types'; // Import your types

const BottomNav = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const ICON_SIZE = 28;
  const ICON_COLOR = 'black';

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
    borderTopColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 100,
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },
});

export default BottomNav;
