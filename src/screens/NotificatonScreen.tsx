import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDERS } from '../utils/constant'; // Import your constants

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('Notification');

  // Load the last active tab from storage
  useEffect(() => {
    const loadActiveTab = async () => {
      const savedTab = await AsyncStorage.getItem('activeTab');
      if (savedTab) {
        setActiveTab(savedTab);
      }
    };
    loadActiveTab();
  }, []);

  // Save the active tab to storage when it changes
  const handleTabSwitch = async (tab: string) => {
    setActiveTab(tab);
    await AsyncStorage.setItem('activeTab', tab);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Any updates</Text>
      <Text style={styles.subtitle}>
        The latest updates, alerts, and messages from what matters most to you.
      </Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Notification' && styles.activeTab,
          ]}
          onPress={() => handleTabSwitch('Notification')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Notification' && styles.activeTabText,
            ]}
          >
            Notification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'Messages' && styles.activeTab,
          ]}
          onPress={() => handleTabSwitch('Messages')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Messages' && styles.activeTabText,
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Notification' ? (
        <View style={styles.messageContainer}>
          <MaterialIcons
            name="notifications-none"
            size={FONT_SIZES.xxLarge}
            color={COLORS.light.secondaryText}
            style={styles.icon}
          />
          <Text style={styles.heading}>No Notifications Yet</Text>
          <Text style={styles.description}>
            When there’s something new, we’ll let you know here. Enable
            notifications to stay updated on important alerts and updates.
          </Text>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <MaterialIcons
            name="message"
            size={FONT_SIZES.xxLarge}
            color={COLORS.light.secondaryText}
            style={styles.icon}
          />
          <Text style={styles.heading}>No Messages Yet</Text>
          <Text style={styles.description}>
            Your conversations will appear here. Start connecting by messaging
            your friends or favorite contacts!
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.large,
    backgroundColor: COLORS.light.background,
  },
  title: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.light.text,
    marginBottom: SPACING.small,
  },
  subtitle: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.light.secondaryText,
    marginBottom: SPACING.large,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.large,
  },
  tabButton: {
    flex: 1,
    paddingVertical: SPACING.small,
    backgroundColor: COLORS.light.border,
    marginHorizontal: SPACING.xsmall,
    borderRadius: BORDERS.radiusLarge,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: COLORS.light.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.light.secondaryText,
  },
  activeTabText: {
    color: COLORS.light.background,
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: SPACING.xLarge,
  },
  icon: {
    marginBottom: SPACING.medium,
  },
  heading: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.light.text,
    marginBottom: SPACING.small,
  },
  description: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.light.secondaryText,
    textAlign: 'center',
    paddingHorizontal: SPACING.large,
  },
});

export default NotificationScreen;
