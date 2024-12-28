import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import cardData from '../Data/DummyDataCard'; // Your dummy data

// Define the route type for ArticleScreen with an expected id parameter
type ArticleScreenRouteProp = RouteProp<{ ArticleScreen: { id: string } }, 'ArticleScreen'>;

const ArticleScreen = () => {
  const route = useRoute<ArticleScreenRouteProp>(); // Get route params
  const { id } = route.params; // Get the id from the params

  // Find the article by id
  const article = cardData.find(item => item.id === id);

  // If article not found, fallback to HomeScreen content or placeholder
  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Article not found</Text>
        <Text style={styles.date}>This article is unavailable.</Text>
        
        {/* Show default HomeScreen-like content */}
        <Text style={styles.placeholderTitle}>Here is some recommended content:</Text>
        <Text style={styles.content}>Check out the latest posts from our home page!</Text>

        {/* Optionally, you could add a button to navigate back to the HomeScreen */}
        <Button title="Go to Home" onPress={() => { /* Navigation logic to Home screen */ }} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.date}>{article.date}</Text>
      <Text style={styles.content}>{article.description}</Text>
      <Text style={styles.content}>{article.category}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  placeholderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default ArticleScreen;
