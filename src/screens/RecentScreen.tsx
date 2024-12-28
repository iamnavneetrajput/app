import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ItemsFrame from '../components/ItemsFrame';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant';

export default function RecentScreen() {
  const [recents, setRecents] = useState<{ id: string; [key: string]: any }[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigation = useNavigation();

  const fetchRecents = async () => {
    setLoading(true);
    setProgress(0);

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
    navigation.navigate('ArticleScreen', { id: item.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Items</Text>
      {loading && (
        <View style={styles.progressContainer}>
          <Progress.Bar
            progress={progress}
            width={null}
            color={COLORS.light.primary}
            height={8}
            borderRadius={4}
          />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      {!loading && recents.length > 0 ? (
        <FlatList
          data={recents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemsFrame
              item={item}
              onPress={() => handleSelectItem(item)}
              onDelete={() => eraseRecentItem(item.id)}
              showDateAndCategory={true}
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
    backgroundColor: COLORS.light.background,
    padding: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginBottom: SPACING.medium,
  },
  progressContainer: {
    marginVertical: SPACING.medium,
  },
  loadingText: {
    marginTop: SPACING.small,
    textAlign: 'center',
    color: COLORS.light.secondaryText,
    fontSize: FONT_SIZES.small,
  },
  noRecents: {
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    color: COLORS.light.secondaryText,
    marginTop: SPACING.large,
  },
});