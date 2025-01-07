import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FONT_SIZES, COLORS } from '../utils/constant';

interface DynamicTitleProps {
  title: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.light.text,
  },
});

export default DynamicTitle;