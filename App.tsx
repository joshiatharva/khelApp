/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import BottomTabNavigator from './src/navigation/TabNavigator';
import { NavigationContainer, DarkTheme as NavDarkTheme, DefaultTheme as NavDefaultTheme} from '@react-navigation/native';
import { DarkTheme, LightTheme, ThemeContext } from './src/theme';

export const App = () => {
  const colorScheme = useColorScheme();
  const [activeTheme, setActiveTheme] = useState(
    colorScheme === 'dark' ? DarkTheme : LightTheme, 
  );

  const theme = useContext(ThemeContext);
  NavDarkTheme.colors.background = activeTheme.colors.altBackground;

  useEffect(() => {
    if (colorScheme === 'dark') {
      setActiveTheme(DarkTheme);
    } else {
      setActiveTheme(LightTheme);
    }
  }, [colorScheme]);

  return (
        <ThemeContext.Provider value={activeTheme}>
          <NavigationContainer theme={colorScheme === 'dark' ? NavDarkTheme : NavDefaultTheme}>
            <BottomTabNavigator />
          </NavigationContainer>
        </ThemeContext.Provider>
  );
}

export default App;
