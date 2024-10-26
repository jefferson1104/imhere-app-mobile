import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { useFonts, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter';

import { Routes } from './src/routes';

import theme from './src/theme';

import { Loading } from '@components/Loading';

export default function App() {
  // Hooks
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });

  // Renders
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
