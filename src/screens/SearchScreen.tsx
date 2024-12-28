import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import ItemsFrame from '../components/ItemsFrame'; // Import reusable ItemsFrame component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import cardData from '../Data/DummyDataCard'; // Import the cardData

export default function SearchScreen() {
  const navigation = useNavigation(); // Initialize navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<{ id: string; title: string; description: string; category: string; date: string; image: string; }[]>([]);
  const [history, setHistory] = useState<{ id: string; title: string; description: string; category: string; date: string; image: string; }[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    };
    loadHistory();
  }, []);

  const saveHistory = async (newHistory: any[]) => {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredData([]);
    } else {
      const results = cardData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) // Searching within the cardData titles
      );
      setFilteredData(results);
    }
  };

  const handleSelectItem = async (item: { id: string; title: string; description: string; category: string; date: string; image: string; }) => {
    const updatedHistory = [item, ...history.filter((h) => h.id !== item.id)];
    setHistory(updatedHistory);
    await saveHistory(updatedHistory);
    setSearchQuery('');
    setFilteredData([]);
    setIsFocused(false);

    // Navigate to the ArticleScreen with the selected item
    navigation.navigate('ArticleScreen', { id: item.id });
  };

  const eraseAllHistory = async () => {
    setHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  };

  const eraseHistoryItem = async (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    await saveHistory(updatedHistory);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="What do you want to read?"
          value={searchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => !searchQuery && setIsFocused(false)}
          onChangeText={handleSearch}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={24} color="gray" style={styles.icon} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Search Results */}
      {isFocused && searchQuery.trim() && (
        <>
          {filteredData.length > 0 ? (
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ItemsFrame
                  item={item}
                  onPress={() => handleSelectItem(item)} // Call handleSelectItem when item is clicked
                  showDateAndCategory={true} // Display date and category for search results
                  showHeartIcon={true}
                />
              )}
            />
          ) : (
            <Text style={styles.noResults}>No results found</Text>
          )}
        </>
      )}

      {/* Search History */}
      {!isFocused && history.length > 0 && (
        <>
          <TouchableOpacity onPress={eraseAllHistory} style={styles.clearButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="clear-all" size={20} color="gray" />
              <Text style={styles.clearText}> Clear All</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            data={history}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ItemsFrame
                item={item}
                onPress={() => handleSelectItem(item)} // Call handleSelectItem when history item is clicked
                onDelete={() => eraseHistoryItem(item.id)}
                showDateAndCategory={false} // Hide date and category for search history
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  clearText: {
    fontSize: 14,
    // color: 'red',
  },
});
