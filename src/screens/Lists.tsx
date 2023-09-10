import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { ListStackParamList } from "../navigation/ListStackNavigator";
import { BottomTabParamList } from "../navigation/TabNavigator";
import { CompositeScreenProps } from "@react-navigation/native";

export type ListProps = {

}

export type ListScreenProps = CompositeScreenProps<
StackScreenProps<ListStackParamList>,
BottomTabScreenProps<BottomTabParamList, 'Lists'>
>;

export const Lists = ({ navigation }: ListScreenProps) => {
  const [data, setData] = useState<Map<string, object>>();

  useEffect(() => {
    const fetchData = async () => {
      const map = await AsyncStorage.getItem('lists');
    }
    fetchData();
  }, []);
  
  return (
    <View>
      <Text>Lists</Text>
    </View>
  );
}

export default Lists;