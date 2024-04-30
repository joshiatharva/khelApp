import { FlatList, Platform, Text, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListStackParamList } from "../navigation/ListStackNavigator";
import { BottomTabParamList } from "../navigation/TabNavigator";
import { useFocusEffect, type CompositeScreenProps } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, store } from "../store";
import { KhelListProps, useResponsiveStyles, _get, _deleteAll } from "../utils";
import { KhelList, Type } from "../components";
import MoreInfo from "./MoreInfo";
import { Button } from "@rneui/base";
import { ThemeContext, ThemeInterface } from "../theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCallback, useContext, useEffect, useState } from "react";


export type ListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ListStackParamList>,
  BottomTabScreenProps<BottomTabParamList, 'List'>
>;

const base = (theme: ThemeInterface) => ({
  button: {
    width: '100%' as const,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
  },
  button_ios: {
    borderCurve: 'continuous' as const,
  },  
  button_group: {
    flexDirection: 'column' as const,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: 10, 
    gap: theme.spacing.sm,
  },
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  button_container: {
    padding: theme.spacing.xxs,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  content_container: {
    gap: theme.spacing.xs,
  },
  button_error: {
    backgroundColor: theme.colors.red,
    borderRadius: 10,
  },
});

export const Lists = ({ navigation }: ListScreenProps) => {

  const styles = useResponsiveStyles({ base });

  const [list, setList] = useState<KhelListProps[]>([]);
  const [err, setErr] = useState<string>();

  const getData = useCallback(async () => {
    if (list.length === 0) {
      const data  = await _get();
      console.log('data', data);
      if (data.result) {
        setList(data.result)
      } else if (data.error) {
        setErr(data.error)
      }
    }
  }, []);

  useFocusEffect(() => {
    console.log('focus');
    getData();
  });

  const info = (index: number) => {
    const khelList = list[index];
    navigation.push('ListMoreInfo', { item: JSON.stringify(khelList), name: khelList.name ? khelList.name : 'Undefined' });
  }

  const share = () => {

  }

  const theme = useContext(ThemeContext);

  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios, 
  ];

  const buttonErrorStyles = [styles.button, styles.button_error, Platform.OS === 'ios' && styles.button_ios];

  const buttonContainerStyles = [styles.button_container];

  const containerStyles = [styles.container];

  const contentContainerStyles = [styles.content_container]

  const renderItem = ({item: { name, id, categories, khel }, index } : { item : KhelListProps, index: number }) => (
    <KhelList 
      name={name}
      id={id}
      categories={categories}
      khel={khel}
      infoFn={() => info(index)}
      shareFn={share}
    />
  );

  const deleteAll = useCallback(() => {
    _deleteAll();
    setList([]);
  }, [])

  const generateList = () => navigation.push('GenerateList');
  
  return (
    <View style={containerStyles}>
      <View>
        <Button
          buttonStyle={buttonStyles}
          onPress={generateList}
        >
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='add-outline'
              size={theme.icon.md}
              color={theme.colors.title}
            />
            <Type color="title" weight="bold" size='md'>
              Generate new list
            </Type>
          </View>
        </Button>
        {/* <Button buttonStyle={buttonErrorStyles} onPress={deleteAll}>
          <View style={buttonContainerStyles}>
            <Type color="title" weight="bold" size='md'>Delete all</Type>
          </View>
        </Button> */}
      </View>
      <FlatList
        contentContainerStyle={contentContainerStyles}
        renderItem={renderItem}
        data={list}
      />
    </View>
  );
}

export default Lists;