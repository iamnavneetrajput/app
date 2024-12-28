import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant';

// Import Card Data
import cardData from '../Data/DummyDataCard';

interface BlogItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    image: string;
  };
}

const BlogItem = ({ item }: BlogItemProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    // Navigate to ArticleScreen and pass the id
    navigation.navigate('ArticleScreen', { id: item.id });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.blogItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.blogDetails}>
        <Text style={styles.blogTitle}>{item.title}</Text>
        <Text style={styles.blogContent}>{item.description}</Text>
        <Text style={styles.blogDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const MainContent = () => {
  const [category, setCategory] = useState('All'); // Default to all categories
  const [dateFilter, setDateFilter] = useState('Newest'); // Default to newest
  const [isCategoryVisible, setIsCategoryVisible] = useState(false); // Toggle for category dropdown
  const [isSortByVisible, setIsSortByVisible] = useState(false); // Toggle for sort by dropdown

  // Filter posts based on selected category
  const filteredData = cardData.filter((item) => {
    return category === 'All' || item.category === category;
  });

  // Sort posts based on selected date filter
  const sortedData = filteredData.sort((a, b) => {
    if (dateFilter === 'Newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Newest first
    } else if (dateFilter === 'Oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime(); // Oldest first
    }
    return 0;
  });

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setIsCategoryVisible(false); // Close the category dropdown
  };

  const handleSortBySelect = (selectedSort: string) => {
    setDateFilter(selectedSort);
    setIsSortByVisible(false); // Close the sort by dropdown
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Filters */}
      <View style={styles.filterBar}>
        {/* Category Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Categories |</Text>
          <TouchableOpacity onPress={() => setIsCategoryVisible(!isCategoryVisible)}>
            <Text style={styles.filterOption}>
              {category.length > 10 ? `${category.substring(0, 10)}...` : category}
            </Text>
          </TouchableOpacity>

          {isCategoryVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => handleCategorySelect('All')}>
                <Text style={styles.dropdownOption}>All</Text>
              </TouchableOpacity>
              {Array.from(new Set(cardData.map(item => item.category))).map((category) => (
                <TouchableOpacity key={category} onPress={() => handleCategorySelect(category)}>
                  <Text style={styles.dropdownOption}>{category}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Sort by Filter */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Sort by |</Text>
          <TouchableOpacity onPress={() => setIsSortByVisible(!isSortByVisible)}>
            <Text style={styles.filterOption}>{dateFilter}</Text>
          </TouchableOpacity>

          {isSortByVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={() => handleSortBySelect('Newest')}>
                <Text style={styles.dropdownOption}>Newest</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSortBySelect('Oldest')}>
                <Text style={styles.dropdownOption}>Oldest</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Blog Post List */}
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogItem item={item} />}
        contentContainerStyle={styles.blogList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.background,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 16,
    color: 'black',
  },
  filterOption: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    width: 120,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    zIndex: 10,
  },
  dropdownOption: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  blogList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 50,
  },
  blogItem: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  blogDetails: {
    flex: 1,
  },
  blogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  blogContent: {
    fontSize: 14,
    color: '#555',
  },
  blogDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default MainContent;
