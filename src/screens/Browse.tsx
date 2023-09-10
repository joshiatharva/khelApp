import { useState } from "react";
import { FlatList, View, Text } from "react-native";

import khel from '../assets/khel.json';
import { KhelProps, KhelItem, KhelCategory } from "../components/KhelItem";
import { useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/TabNavigator";

type TabNavigationProps = BottomTabScreenProps<BottomTabParamList, 'Browse'>;

export type BrowseProps = {
    /** */
    type?: KhelCategory;
    /** */

}

export const Browse = ({ navigation, route }: TabNavigationProps) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<KhelCategory>();
    const [searchString, setSearchString] = useState<string>();

    const getKhelList = () => {

    }

    const renderItem = ({name, aim, category}: KhelProps) => (
        <KhelItem name={name} aim={aim} category={category} />
    );

    return (
        <View>
            <Text>Hello World!</Text>
            <KhelItem 
                name={khel[0].name}
                meaning={khel[0].meaning}
                aim={khel[0].aim}
                description={khel[0].description}
                category={khel[0].category as KhelCategory}
            />
        </View>
    )

};

export default Browse;