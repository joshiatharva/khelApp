
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { KhelProps } from "../components/KhelItem";
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack";

import GenerateList from '../screens/GenerateList';
import MoreInfo from '../screens/MoreInfo';
import Lists from '../screens/Lists';


export type ListStackParamList = {
  Lists: undefined;
  GenerateList: undefined;
  MoreInfo: { item: KhelProps };
};

export const ListStack = createStackNavigator<ListStackParamList>();

export const ListStackNavigator = () => (
  <ListStack.Navigator>
    <ListStack.Screen name="Lists" component={Lists} />
    <ListStack.Screen name="GenerateList" component={GenerateList} />
    <ListStack.Screen name="MoreInfo" component={MoreInfo} />
  </ListStack.Navigator>
);

export default ListStackNavigator; 