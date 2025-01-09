
import { useContext } from "react";
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { ListStackParamList, ListStackNavigator as ListStack } from "./ListStackNavigator";
import { BrowseStackParamList, BrowseStackNavigator as BrowseStack } from './BrowseStackNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import About from '../screens/About';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext } from "../theme";
import { Platform } from "react-native";

export type AboutStackParamList = {
  About: undefined;
}

export const AboutStack = createNativeStackNavigator<AboutStackParamList>();
 
export const AboutStackNavigator = () => {
  const theme = useContext(ThemeContext);
  return (
  <AboutStack.Navigator>
    <AboutStack.Screen 
      name="About"
      component={About}
      options={{ 
        title: 'About',
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
      }}
    />
    </AboutStack.Navigator>
  );
}

export type BottomTabParamList = {
  Browse: NavigatorScreenParams<BrowseStackParamList>;
  List: NavigatorScreenParams<ListStackParamList>;
  AboutScreen: NavigatorScreenParams<AboutStackParamList>;
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
        name="AboutScreen" 
        component={AboutStackNavigator}
        options={{
          title: "About",
          tabBarIcon: (
            ({ focused, color, size }) => 
            <Ionicons
              name='cog-outline'
              color={color}
              size={size}
            />
          ),
          headerShown: false
        }}
      />
    </BottomTab.Navigator>
  )
};

export default BottomTabNavigator;
