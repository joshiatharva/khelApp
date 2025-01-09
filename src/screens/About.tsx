import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect } from 'react';
import { View, ScrollView, Platform, Pressable, Linking, Alert} from 'react-native';
import { AboutStackParamList, BottomTabParamList } from '../navigation/TabNavigator';
import { Button } from '@rneui/base';
import { CategoryBadge, Type } from '../components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ThemeContext, ThemeInterface } from '../theme';
import { useResponsiveStyles } from '../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { convertToRGBA } from 'react-native-reanimated';

type AboutScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AboutStackParamList>,
  BottomTabScreenProps<BottomTabParamList, 'AboutScreen'>
>;

const base = (theme: ThemeInterface) => ({
  content_container: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.md,
  },
  button: {
    width: '100%' as const,
    backgroundColor: theme.colors.blue,
    borderRadius: 8,
  },
  button_ios: {
    borderCurve: 'continuous' as const,
  },
  button_container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  package_view_container: {
    padding: theme.spacing.md,
    justifyContent: 'center' as const,
    backgroundColor: theme.colors.background, 
    borderRadius: 20,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  package_view_row: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    flexShrink: 0,
  },
  team_container: {
    borderRadius: theme.categoryBadge.borderRadius,
    paddingHorizontal: theme.categoryBadge.paddingHorizontal,
    paddingVertical: theme.categoryBadge.paddingVertical,
    backgroundColor: theme.colors.blue,
    flexWrap: 'wrap' as const,
    flexShrink: 0,
  },
  team_container_ios: {
    borderCurve: 'continuous' as const,
  },
  title_container: {
    gap: theme.spacing.xs,
    alignItems: 'flex-start' as const,
  },
  link_container: {
    backgroundColor: theme.colors.altBackground,
    borderRadius: theme.spacing.xs,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: theme.spacing.xs,
  },
  package_parent_container: {
    gap: theme.spacing.xs,
  },
});

const packageList = [
  {
    name: '@react-navigation',
    description: "Core utilities for building navigators",
    author: "@react-navigation",
    link: 'https://reactnavigation.org/',
  },
  {
    name: "@rneui/base",
    description: "Cross Platform React Native UI Toolkit",
    author: "RNE Core Team",
    link: 'https://reactnativeelements.com/',
  },
  {
    name: "AsyncStorage",
    description: "Asynchronous, persistent, key-value storage system for React Native.",
    author: "Krzysztof Borowy <hello@krizzu.dev>",
    link: 'https://react-native-async-storage.github.io/async-storage/',
  },
  {
    name: "@segmented-control",
    description: "React Native SegmentedControlIOS library",
    author: "M.Haris Baig",
    link: 'https://github.com/react-native-segmented-control/segmented-control#readme',
  },
  {
    name: "react-native-reanimated",
    description: "More powerful alternative to Animated library for React Native.",
    author: "Krzysztof Magiera",
    link: 'https://docs.swmansion.com/react-native-reanimated/https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    name: "Draggable Flatlist",
    description: "A drag-and-drop-enabled FlatList component for React Native",
    author: "Daniel Merrill",
    link: 'https://github.com/computerjazz/react-native-draggable-flatlist#readme',
  },
];

export const About = ({}: AboutScreenProps) => {
  const theme = useContext(ThemeContext);
  const styles = useResponsiveStyles({ base });
  const contentContainerStyles = [styles.content_container];
  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios,
  ];
  const buttonContainerStyles = [
    styles.button_container,
  ];
  const packageViewContainerStyles = [styles.package_view_container];
  const packageViewRowStyles = [styles.package_view_row];
  const teamContainerStyles = [
    styles.team_container,
    Platform.OS === 'ios' && styles.team_container_ios,
  ];
  const titleContainerStyles = [
    styles.title_container,
  ];
  const linkStyleContainer = [
    styles.link_container,
  ];
  const packageParentContainer = [
    styles.package_parent_container,
  ]

  const AuthorBadge = ({ author } : { author: string }) => (
    <View style={teamContainerStyles} key={author}>
      <Type size='xs' weight='bold' color='category'>{author}</Type>
    </View>
  );

  const handlePress = async (link: string) => {
    const isSupported = await Linking.canOpenURL(link);
    if (isSupported) { 
      await Linking.openURL(link);
    } else {
      Alert.alert('Link was not available.');
    }
  };

  const Package = ({ name, author, linkUrl, description }: { name: string, author: string, linkUrl: string, description: string }) => {
    return (
      <View style={packageViewContainerStyles}>
        <View style={packageViewRowStyles}>
          <View style={titleContainerStyles}>
            <Type weight='bold' color='title' size='md' key={name}>{name}</Type>
            <AuthorBadge author={author}/> 
          </View>
          <View>
            <Pressable style={linkStyleContainer} onPress={() => handlePress(linkUrl)}>
              <Ionicons
                  name='file-tray-full'
                  size={theme.icon.md}
                  color={theme.colors.blue}
                />
            </Pressable>
          </View>
        </View>
          <Type size='sm' weight='medium'>{description}</Type>
      </View>
    );
  };

  return (
  <ScrollView contentContainerStyle={contentContainerStyles} contentInsetAdjustmentBehavior='automatic'>
    <View>
        <Type weight='medium' size='sm'>This app is based on the awesome work done by Miteshji Sevani to digitise the big book of Shakha khel.</Type>
    </View>
    <View>
        <Type weight='medium' size='sm'>Feedback, suggestions and questions on anything about this app, are welcome. Kindly contact the developers using the button below.</Type>
    </View>
      <Button buttonStyle={buttonStyles}>
        <View style={buttonContainerStyles}>
        <Ionicons 
          name='mail-outline'
          size={theme.icon.sm}
          color={theme.colors.invertedTitle}
        />
        <Type weight='medium' size='sm' color='inverted'>Contact developers</Type>
        </View>
      </Button>
      <View>
        <Type weight='medium' size='sm'>This project is 100% open source and can be found on GitHub using the link below. Pull requests for improvements and extending functionality are always welcome.</Type>
      </View>
      <Button buttonStyle={buttonStyles}>
        <View style={buttonContainerStyles}>
        <Ionicons 
          name='logo-github'
          size={theme.icon.sm}
          color={theme.colors.invertedTitle}
        />
        <Type weight='medium' size='sm' color='inverted'>Github Repo</Type>
        </View>
        </Button>
    <View>
      <Type weight='bold' size='sm'>Libraries used:</Type>
      <View style={packageParentContainer}>
        {packageList.map(({ name, description, author, link } : {name: string, description: string, author: string, link: string}) => (
          <Package name={name} description={description} linkUrl={link} author={author} />
        ))}
      </View>
    </View>
  </ScrollView>
  );
};

export default About;