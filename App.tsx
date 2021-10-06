import React from 'react';
import AppLoading from 'expo-app-loading';
import { Dashboard } from './src/screens/Dashboard';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import i18n from 'i18n-js';
import { en_us, pt_br } from './src/i18n/supportedLanguages';
import * as Localization from 'expo-localization';
import { Register } from './src/screens/Register';
import { CategorySelect } from './src/screens/CategorySelect';
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './src/screens/app.routes';

export default function App() {
  i18n.fallbacks = true;
  i18n.translations = { en: en_us, pt: pt_br };
  i18n.locale = Localization.locale;

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
