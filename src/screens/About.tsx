import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { BottomTabParamList } from '../navigation/TabNavigator';
import { Button } from '@rneui/base';
import { Type } from '../components';

type TabNavigationProps = BottomTabScreenProps<BottomTabParamList>;

export const About = ({ navigation, route }: TabNavigationProps) => {
  return (
  <>
    <View>
        <Type>This app is based on the awesome work done by Miteshji Sevani to digitise the big book of Shakha khel.</Type>
        <Type>Feedback, suggestions and questions on anything about this app, are welcome. Kindly contact the developers using the button below.</Type>
        <Button>Contact developers</Button>
        <Type>This project is 100% open source and can be found on GitHub using the link below. Pull requests for improvements and extending functionality are always welcome.</Type>
        <Button>Github Repo</Button>
    </View>
    <View>


    </View>
  </>
  );
};

export default About;