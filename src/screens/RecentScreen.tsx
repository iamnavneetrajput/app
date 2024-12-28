import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress'; // Progress bar library
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import navigation and useFocusEffect
import ItemsFrame from '../components/ItemsFrame'; // Your ItemsFrame component for rendering articles

export default function RecentScreen() {
  const [recents, setRecents] = useState<{ id: string; [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation(); // Initialize navigation

  const fetchRecents = async () => {
    setLoading(true);
    setProgress(0);

    // Simulate loading process with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 0.1;
        if (next >= 1) clearInterval(interval);
        return Math.min(next, 1);
      });
    }, 100);

    const storedRecents = await AsyncStorage.getItem('recentItems');
    if (storedRecents) {
      setRecents(JSON.parse(storedRecents));
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRecents();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRecents();
    }, [])
  );

  const eraseAllRecents = async (): Promise<void> => {
    setRecents([]);
    await AsyncStorage.removeItem('recentItems');
  };

  const eraseRecentItem = async (id: string) => {
    const updatedRecents = recents.filter((item) => item.id !== id);
    setRecents(updatedRecents);
    await AsyncStorage.setItem('recentItems', JSON.stringify(updatedRecents));
  };

  const handleSelectItem = (item: { id: string }) => {
    // Navigate to ArticleScreen and pass the selected item's id
    navigation.navigate('ArticleScreen', { id: item.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Items</Text>

      {/* Progress Bar */}
      {loading && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={progress}
            width={null}
            color="#3498db"
            height={8}
            borderRadius={4}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* Recent Items List */}
      {!loading && recents.length > 0 ? (
        <FlatList
          data={recents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemsFrame
              item={item}
              onPress={() => handleSelectItem(item)} // Navigate on press
              onDelete={() => eraseRecentItem(item.id)}
              showDateAndCategory={true} // You can pass this flag to ItemsFrame to show date and category
            />
          )}
        />
      ) : !loading ? (
        <Text style={styles.noRecents}>No recent items found</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    marginVertical: 16,
  },
  loadingText: {
    marginTop: 8,
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
  noRecents: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
});
