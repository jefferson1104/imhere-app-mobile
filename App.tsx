import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { SQLiteProvider } from 'expo-sqlite';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { Routes } from './src/routes';

import { initializeDatabase } from '@database/initializeDatabase';

import theme from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  // Hooks
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  // Renders
  return (
    <SQLiteProvider databaseName='imHereSqlite.db' onInit={initializeDatabase}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading style={{ flex: 1 }} />}
      </ThemeProvider>
    </SQLiteProvider>
  );
}
