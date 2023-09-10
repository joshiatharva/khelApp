/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Browse from './src/screens/Browse';
import { ListStackNavigator } from './src/navigation/ListStackNavigator';
import BottomTabNavigator from './src/navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

export const App = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}

export default App;
