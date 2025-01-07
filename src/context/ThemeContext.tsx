import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

// Define themes
const LightTheme = {
  background: '#FFFFFF',
  text: '#000000',
};

const DarkTheme = {
  background: '#000000',
  text: '#FFFFFF',
};

// Define the context interface
interface ThemeContextType {
  theme: typeof LightTheme | typeof DarkTheme;
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider
export const ThemeProvider: React.FC = ({ children }) => {
  const systemColorScheme = useColorScheme(); // 'light' or 'dark'
  const [mode, setMode] = useState<'light' | 'dark' | 'system'>('system');

  const theme = 
    mode === 'light' ? LightTheme : 
    mode === 'dark' ? DarkTheme : 
    systemColorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
