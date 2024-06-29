
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GenerateList from '../screens/GenerateList';
import MoreInfo from '../screens/MoreInfo';
import Lists from '../screens/Lists';
import ListMoreInfo from '../screens/ListMoreInfo';


import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../theme";
import { KhelProps, KhelListProps } from "../utils";


export type ListStackParamList = {
  Lists: undefined;
  GenerateList: undefined;
  ListMoreInfo: { item: string, name: string };
  MoreInfo: { item: string, name: string };
};

const theme = useContext(ThemeContext)

export const ListStack = createNativeStackNavigator<ListStackParamList>();

export const ListStackNavigator = () => (
  <ListStack.Navigator>
    <ListStack.Group>
      <ListStack.Screen 
        name="Lists" 
        component={Lists} 
        options={{ title: 'My lists' }}
      />
     </ListStack.Group>
    <ListStack.Group screenOptions={{ presentation: 'modal' }}>
      <ListStack.Screen 
        name="GenerateList" 
        component={GenerateList} 
        options={{ title: 'Generate lists', headerLargeTitle: true }}
      />

      <ListStack.Screen 
        name="MoreInfo" 
        component={MoreInfo} 
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerLargeTitle: true,
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="close-circle-outline" color={theme.colors.blue} size={theme.icon.md} />
            </Pressable>
          ),
        })}
      />
    <ListStack.Screen 
        name="ListMoreInfo" 
        component={ListMoreInfo} 
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerLargeTitle: true,
          headerTransparent: true, 
        })}
        />
      </ListStack.Group>
  </ListStack.Navigator>
);

export default ListStackNavigator; 