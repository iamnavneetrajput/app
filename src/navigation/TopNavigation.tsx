import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from './types';

const TopNav = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.navbar}>
      {/* Left Section for Static Title */}
      <View style={styles.leftSection}>
        <Text style={styles.title}>Intelli</Text>
      </View>

      {/* Right Section with navigation buttons */}
      <View style={styles.rightSection}>
        {/* Notifications Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <MaterialCommunityIcons name="bell-outline" size={24} color="black" />
        </TouchableOpacity>

        {/* Recent Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('RecentScreen')}
        >
          <MaterialCommunityIcons name="progress-clock" size={24} color="black" />
        </TouchableOpacity>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color="black" />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  leftSection: {
    flex: 1, // Allocate space for the title on the left
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default TopNav;
