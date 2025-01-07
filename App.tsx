import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingScreen';
import SearchScreen from './src/screens/SearchScreen';
import RecentScreen from './src/screens/RecentScreen';
import ArticleScreen from './src/screens/ArticleScreen';
import TopNav from './src/navigation/TopNavigation';
import BottomNavigation from './src/navigation/BottomNavigation';
import NotificationScreen from './src/screens/NotificatonScreen';
import AuthScreen from './src/screens/AuthScreen';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    // Disable all warnings in development mode
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          {/* Top Navigation */}
          <TopNav />

          {/* Stack Navigator */}
          <Stack.Navigator
            screenOptions={{
              headerShown: false, // Disable header for all screens
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="RecentScreen" component={RecentScreen} />
            <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </Stack.Navigator>

          {/* Bottom Navigation */}
          <BottomNavigation />
        </SafeAreaView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
