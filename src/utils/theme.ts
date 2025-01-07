import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTheme = async (): Promise<string | null> => {
  try {
    const theme = await AsyncStorage.getItem('theme');
    return theme;
  } catch (error) {
    console.error('Failed to fetch theme from AsyncStorage:', error);
    return null;
  }
};

export const setTheme = async (theme: string) => {
  try {
    await AsyncStorage.setItem('theme', theme);
  } catch (error) {
    console.error('Failed to save theme to AsyncStorage:', error);
  }
};
