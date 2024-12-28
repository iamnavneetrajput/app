import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import cardData from '../Data/DummyDataCard';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constant';

type ArticleScreenRouteProp = RouteProp<{ ArticleScreen: { id: string } }, 'ArticleScreen'>;

const ArticleScreen = () => {
  const route = useRoute<ArticleScreenRouteProp>();
  const { id } = route.params;
  const article = cardData.find(item => item.id === id);

  if (!article) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Article not found</Text>
        <Text style={styles.date}>This article is unavailable.</Text>
        <Text style={styles.placeholderTitle}>Here is some recommended content:</Text>
        <Text style={styles.content}>Check out the latest posts from our home page!</Text>
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
    padding: SPACING.medium,
  },
  title: {
    fontSize: FONT_SIZES.xLarge,
    fontWeight: 'bold',
    marginBottom: SPACING.small,
  },
  date: {
    fontSize: FONT_SIZES.small,
    color: COLORS.light.secondaryText,
    marginBottom: SPACING.medium,
  },
  content: {
    fontSize: FONT_SIZES.medium,
    lineHeight: 24,
    color: COLORS.light.text,
  },
  placeholderTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    marginTop: SPACING.medium,
  },
});

export default ArticleScreen;