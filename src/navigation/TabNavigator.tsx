
import { BottomTabNavigationProp, BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { ListStackParamList, ListStackNavigator as ListStack } from "./ListStackNavigator";
import { BrowseStackParamList, BrowseStackNavigator as BrowseStack } from './BrowseStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import About from '../screens/About';

export type BottomTabParamList = {
  Browse: NavigatorScreenParams<BrowseStackParamList>;
  List: NavigatorScreenParams<ListStackParamList>;
  About: undefined;
};

export type TabNavigationProps = BottomTabScreenProps<BottomTabParamList>;

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen 
        name="Browse" 
        component={BrowseStack}
        options={{ 
          tabBarLabel: 'Browse all',
          tabBarIcon: (
            ({ focused, color, size }) => 
              <Ionicons
                name={focused ? 'reader' : 'reader-outline'}
                size={size}
                color={color}
              />
          ),
          headerShown: false
        }}
      />
      <BottomTab.Screen 
        name="List" 
        component={ListStack} 
        options={{ 
          tabBarLabel: 'My lists',
          tabBarIcon: (
            ({ focused, color, size }) => 
              <Ionicons
                name={focused ? 'albums' : 'albums-outline'}
                size={size}
                color={color}
              />
          ),
          headerShown: false
        }}
      />
      <BottomTab.Screen 
        name="About" 
        component={About}
        options={{
          tabBarIcon: (
            ({ focused, color, size }) => 
            <Ionicons
              name='cog-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  )
};

export default BottomTabNavigator;
