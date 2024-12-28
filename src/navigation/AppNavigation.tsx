import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types'; // Import your types
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingScreen';
import SearchScreen from '../screens/SearchScreen';
import RecentScreen from '../screens/RecentScreen';
import ArticleScreen from '../screens/ArticleScreen';

const Stack = createStackNavigator<RootStackParamList>(); // Create a stack navigator

const AppNavigator = () => {
  return (
    
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="RecentScreen" component={RecentScreen} />
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
