import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your route names and parameters
export type RootStackParamList = {
  Home: undefined; // No params for Home
  Trending: undefined; // No params for Trending
  Search: undefined; // No params for Search
  Profile: undefined; // No params for Profile
  Settings: undefined; // No params for settings
  Notifications: undefined; // No params for Notifications
  RecentScreen: undefined; // No params for Recent
  Saved: undefined; // No params for Saved
  ArticleScreen: { item: { id: string; title: string; description: string; category: string; date: string; image: string } }; // ArticleScreen with item param
};

// Navigation prop type
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type RootStackRouteProp<RouteName extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  RouteName
>;
