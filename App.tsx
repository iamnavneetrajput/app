import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl, LogBox } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigation';
import BottomNavigation from './src/navigation/BottomNavigation';
import TopNav from './src/navigation/TopNavigation';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

          {/* Main App Content */}
          {/* <ScrollView
            contentContainerStyle={styles.appContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          > */}
            <AppNavigator />
          {/* </ScrollView> */}

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
  appContent: {
    flexGrow: 1,
  },
});

export default App;
