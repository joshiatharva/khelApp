import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { BottomTabParamList } from '../navigation/TabNavigator';

type TabNavigationProps = BottomTabScreenProps<BottomTabParamList>;

export const About = ({ navigation, route }: TabNavigationProps) => {
  return (
    <View>
        <Text>About Screen</Text>
    </View>
  );
};

export default About;