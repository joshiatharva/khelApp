import { CompositeScreenProps, NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, Platform, ScrollView, Text, View } from "react-native";
import { ListStackParamList } from "../navigation/ListStackNavigator";
import { BrowseStackParamList } from "../navigation/BrowseStackNavigator";
import { KhelProps, KhelListProps, useResponsiveStyles } from "../utils";
import { isEqual } from "lodash";
import { CategoryBadge, Type } from "../components";
import { Button } from "@rneui/base";
import { ThemeContext, ThemeInterface } from "../theme";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useContext, useEffect, useState } from "react";

type InfoScreenProps = {
  route: RouteProp<BrowseStackParamList | ListStackParamList, 'MoreInfo' | 'MoreInfo'>,
  navigation: NavigationProp<BrowseStackParamList | ListStackParamList, 'MoreInfo' | 'MoreInfo'>
}

const base = (theme: ThemeInterface) => ({
  button: {
    width: '100%' as const,
    backgroundColor: theme.colors.neutral500,
    borderRadius: 10,
  },
  button_group: {
    flexDirection: 'column' as const,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: 10, 
    gap: theme.spacing.sm,
  },
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  khel_container: {
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    alignItems: 'flex-start' as const,
    padding: theme.spacing.md,
    gap: theme.spacing.xs, 
  },
  content_container: {
  },
  button_ios: {
    borderCurve: 'continuous' as const,
  },
  button_container: {
    padding: theme.spacing.xxs,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  }
});



export const MoreInfo = ({ navigation, route }: InfoScreenProps) => {
  
  const theme = useContext(ThemeContext);
  const item = JSON.parse(route.params.item);

  useEffect(() => {
    console.log('item: ', item);
  }, []);

  const styles = useResponsiveStyles({ base });

  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios, 
  ];

  const containerStyles = [styles.container];
  const khelContainerStyles = [styles.khel_container];
  const contentContainerStyles = [styles.content_container];
  const buttonContainerStyles = [styles.button_container];
  const buttonGroupStyles = [styles.button_group]
  
  return ( 
    <ScrollView contentContainerStyle={containerStyles} contentInsetAdjustmentBehavior="automatic">
      <View style={khelContainerStyles}>
        <CategoryBadge category={item.category}/>
        <Type weight='bold' color='title' size="sm">Meaning:</Type>
        <Type size="sm" weight="medium">{item.meaning}</Type>
        <Type weight='bold' color='title' size="sm">Aim:</Type>
        <Type size="sm" weight="medium">{item.aim}</Type>
        <Type weight='bold' color='title'size="sm">Description:</Type>
        <Type size="sm" weight="regular">{item.description}</Type>
      </View>
      <View style={buttonGroupStyles}>
        <Button buttonStyle={buttonStyles}>
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='add'
              size={theme.icon.lg}
              color={theme.colors.title}
            />
            <Type color="title" weight="bold" size='sm'>
              Add to list
            </Type>
          </View>
        </Button>

        <Button buttonStyle={buttonStyles}>
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='share-outline'
              size={theme.icon.md}
              color={theme.colors.title}
            />
            <Type color="title" weight="bold" size='sm'>
              Share khel info
            </Type>
          </View>
        </Button>

        <Button buttonStyle={buttonStyles}>
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='mail-open-outline'
              size={theme.icon.md}
              color={theme.colors.title}
            />
            <Type color="title" weight="bold" size='sm'>
              Spotted something wrong?
            </Type>
          </View>
        </Button>
      </View>
    </ScrollView>
  )
}

export default MoreInfo;