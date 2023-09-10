import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { ListStackParamList } from "../navigation/ListStackNavigator";

type InfoScreenProps = StackScreenProps<ListStackParamList>;

export const MoreInfo = () => {
    const navigation = useNavigation<InfoScreenProps>();

    return (
        <View>
          <Text>More Info</Text>
        </View>
    )
}

export default MoreInfo;