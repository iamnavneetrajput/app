import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Modal, FlatList, SafeAreaView } from 'react-native';
import { COLORS } from '../utils/constant';

const SettingsScreen = () => {
  const [isNightMode, setNightMode] = useState(false);
  const [isNotificationsOn, setNotificationsOn] = useState(true);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Language Options
  const LANGUAGES = ['English', 'Hindi'];

  // Handle Language Selection
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setLanguageModalVisible(false);
  };

    function alert(arg0: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <SafeAreaView style={styles.container}>
      {/* Night Mode Toggle */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>{isNightMode ? 'Night Mode On' : 'Light Mode On'}</Text>
        <Switch
          value={isNightMode}
          onValueChange={() => setNightMode((prev) => !prev)}
        />
      </View>

      {/* Notifications Toggle */}
      <View style={styles.optionRow}>
        <Text style={styles.optionText}>{isNotificationsOn ? 'Notifications ON' : 'Notifications OFF'}</Text>
        <Switch
          value={isNotificationsOn}
          onValueChange={() => setNotificationsOn((prev) => !prev)}
        />
      </View>

      {/* App Language */}
      <TouchableOpacity style={styles.optionRow} onPress={() => setLanguageModalVisible(true)}>
        <Text style={styles.optionText}>App Language</Text>
        <Text style={styles.selectedOption}>{selectedLanguage}</Text>
      </TouchableOpacity>

      {/* About Section */}
      <TouchableOpacity style={styles.optionRow} onPress={() => alert('App Version 1.0\nThis is a demo settings page.')}>
        <Text style={styles.optionText}>About</Text>
      </TouchableOpacity>

      {/* Update App */}
      <TouchableOpacity style={styles.optionRow} onPress={() => alert('Checking for Updates...')}>
        <Text style={styles.optionText}>Update</Text>
      </TouchableOpacity>

      {/* Clear Cache */}
      <TouchableOpacity style={styles.optionRow} onPress={() => alert('Cache Cleared Successfully.')}>
        <Text style={styles.optionText}>Clear Cache</Text>
      </TouchableOpacity>

            {/* Clear Cache */}
            <TouchableOpacity style={styles.optionRow} onPress={() => alert('Cache Cleared Successfully.')}>
        <Text style={styles.optionText}>Version 1.0</Text>
      </TouchableOpacity>


      {/* Add Accounts Section */}
      <View style={styles.accountSection}>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.accountText}>+ Add Facebook Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.accountText}>+ Add Instagram Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
          <Text style={styles.accountText}>+ Add X Account</Text>
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal visible={isLanguageModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleLanguageSelect(item)} style={styles.languageOption}>
                  <Text style={styles.languageText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  selectedOption: {
    fontSize: 16,
    color: '#007BFF',
  },
  accountSection: {
    marginTop: 30,
  },
  accountButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  accountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  languageOption: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: '#ff5a5f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
