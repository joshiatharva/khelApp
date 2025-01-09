
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GenerateList from '../screens/GenerateList';
import MoreInfo from '../screens/MoreInfo';
import Lists from '../screens/Lists';
import ListMoreInfo from '../screens/ListMoreInfo';


import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform, Pressable } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../theme";
import { KhelProps, KhelListProps } from "../utils";


export type ListStackParamList = {
  Lists: undefined;
  GenerateList: undefined;
  ListMoreInfo: { item: string, name: string };
  MoreInfo: { item: string, name: string };
};

export const ListStack = createNativeStackNavigator<ListStackParamList>();


export const ListStackNavigator = () => {
  const theme = useContext(ThemeContext);
  return (
    <ListStack.Navigator>
      <ListStack.Group>
        <ListStack.Screen 
          name="Lists" 
          component={Lists} 
          options={{ 
            title: 'My lists',
            headerLargeTitle: true, 
            headerTransparent: true,
            headerLargeStyle: {
              backgroundColor: theme.colors.altBackground,
            },
            headerBlurEffect: 'prominent',
            headerShadowVisible: true,
          }}
        />
       </ListStack.Group>
      <ListStack.Group screenOptions={{ presentation: 'modal' }}>
        <ListStack.Screen 
          name="GenerateList" 
          component={GenerateList} 
          options={({ }) => ({ 
            title: 'Generate lists', 
            headerLargeTitle: true,
            headerTransparent: true,
            headerLargeStyle: {
              backgroundColor: theme.colors.altBackground,
            },
            headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.1)' : theme.colors.background
            },
            headerBlurEffect: 'prominent',
            headerShadowVisible: true,
            headerLargeTitleShadowVisible: false,
          })}
        />
  
        <ListStack.Screen 
          name="MoreInfo" 
          component={MoreInfo} 
          options={({ route }) => ({
            title: route.params.name,
            headerLargeTitle: true,
            headerTransparent: true,
            headerLargeStyle: {
              backgroundColor: theme.colors.altBackground,
            },
            headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.1)' : theme.colors.background
            },
            headerBlurEffect: 'prominent',
            headerShadowVisible: true,
            headerLargeTitleShadowVisible: false,
        })}
        />
      <ListStack.Screen 
          name="ListMoreInfo" 
          component={ListMoreInfo} 
          options={({ route }) => ({
            title: route.params.name,
            headerLargeTitle: true,
            headerTransparent: true,
            headerLargeStyle: {
              backgroundColor: theme.colors.altBackground,
            },
            headerStyle: {
              backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.1)' : theme.colors.background
            },
            headerBlurEffect: 'prominent',
            headerShadowVisible: true,
            headerLargeTitleShadowVisible: false,
          })}
          />
        </ListStack.Group>
    </ListStack.Navigator>
  );
}

export default ListStackNavigator; 