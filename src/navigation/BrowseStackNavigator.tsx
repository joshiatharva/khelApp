import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

import GenerateList from '../screens/GenerateList';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../theme";
import { KhelProps, KhelListProps } from "../utils";
import Browse from "../screens/Browse";
import MoreInfo from '../screens/MoreInfo';


export type BrowseStackParamList = {
  BrowseAll: undefined;
  MoreInfo: { item: string, name: string };
};


export const BrowseStack = createNativeStackNavigator<BrowseStackParamList>();

export const BrowseStackNavigator = () => {
  const theme = useContext(ThemeContext);
  return (
    <BrowseStack.Navigator>
      <BrowseStack.Group>
        <BrowseStack.Screen 
          name="BrowseAll" 
          component={Browse} 
          options={{ 
            title: 'Browse all', 
            headerLargeTitle: true, 
            headerTransparent: true, 
            headerBlurEffect: 'regular',
            headerRight: () => (
              <Pressable>
                <Ionicons name='filter-circle-outline' color={theme.colors.blue}/>
              </Pressable>
            )
          }}
        />
      </BrowseStack.Group>
      <BrowseStack.Group screenOptions={{ presentation: 'modal' }}>
        <BrowseStack.Screen 
          name="MoreInfo" 
          component={MoreInfo} 
          options={({ route, navigation }) => ({
            title: route.params.name,
            headerLargeTitle: true,
            headerRight: () => (
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="close-circle-outline" color={theme.colors.blue} size={theme.icon.lg} />
              </Pressable>
            ),
            headerLeft: () => null,
          })}
        />
      </BrowseStack.Group>
    </BrowseStack.Navigator>
  );
};

export default BrowseStackNavigator; 