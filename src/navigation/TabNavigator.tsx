
import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { ListStackParamList, ListStackNavigator as ListStack } from "./ListStackNavigator";
import Browse from "../screens/Browse";
import About from '../screens/About';

export type BottomTabParamList = {
  Browse: undefined;
  Lists: NavigatorScreenParams<ListStackParamList>;
  About: undefined;
};

export type TabNavigationProps = BottomTabScreenProps<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Browse" component={Browse}/>
      <BottomTab.Screen name="Lists" component={ListStack} />
      <BottomTab.Screen name="About" component={About} />
    </BottomTab.Navigator>
  )
};

export default BottomTabNavigator;
