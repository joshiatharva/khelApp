import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList, Platform, ScrollView, View } from "react-native";
import { ListStackParamList } from "src/navigation/ListStackNavigator"
import { KhelItemProps, KhelListProps, KhelProps, _delete, useResponsiveStyles } from "../utils";
import { Button } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Khel, KhelList, Type } from "../components";
import { useCallback, useContext } from "react";
import { ThemeContext, ThemeInterface } from "../theme";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store";
// import { del, delAll, upd } from "../features/listSlice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList, { RenderItemParams, ShadowDecorator, ScaleDecorator, OpacityDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ListMoreInfoScreenProps = NativeStackScreenProps<ListStackParamList, 'ListMoreInfo'>

const base = (theme: ThemeInterface) => ({
  button: {
    width: '100%' as const,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
  },
  button_group: {
    flexDirection: 'column' as const,
    paddingVertical: theme.spacing.sm,
    borderRadius: 10, 
    gap: theme.spacing.sm,
  },
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  khel_container: {
    // borderRadius: 20,
    // backgroundColor: theme.colors.background,
    // alignItems: 'flex-start' as const,
    // padding: theme.spacing.md,
    gap: theme.spacing.md, 
  },
  content_container: {
    marginBottom: theme.spacing.md,
  },
  button_ios: {
    borderCurve: 'continuous' as const,
  },
  button_container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  button_warning: {
    backgroundColor: theme.colors.orange,
    borderRadius: 10,
  },
  button_error: {
    backgroundColor: theme.colors.red,
    borderRadius: 10,
  }
});

export const ListMoreInfo = ({
  route,
  navigation,
}: ListMoreInfoScreenProps) => {

  // const data = useSelector((state: RootState) => state.lists);

  // const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  const styles = useResponsiveStyles({ base });

  const list: KhelListProps = JSON.parse(route.params.item);

  const removeOnPress = (index: number) => {
    const newKhel = list.khel.filter((e : KhelProps, i : number) => i !== index);
    const newList = {...list, khel: newKhel };
    // dispatch(upd(newList));
  }

  const deleteList = () => {
    // dispatch(delAll());
    _delete(list).then(() => {
      navigation.navigate('Lists');
    });
  }

  // const PlaceholderList = () => (
  //  <View />
  // )



  const renderListItem = useCallback(
  ({ 
    item: { name, aim, category, meaning, description }, 
    drag,
    getIndex,
    isActive, 
  } : RenderItemParams<KhelProps>) => (
    <Khel
      name={name}
      category={category}
      aim={aim}
      meaning={meaning}
      description={description}
      removeOnPress={() => removeOnPress(getIndex()!)}
      moreInfoOnPress={moreInfo}
    />
  ), []);

  const moreInfo = (k: KhelProps) => {
    navigation.navigate('MoreInfo', { item: JSON.stringify(k), name: k.name });
  }

  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios, 
  ];

  const containerStyles = [styles.container];
  const khelContainerStyles = [styles.khel_container];
  const contentContainerStyles = [styles.content_container];
  const buttonContainerStyles = [styles.button_container];
  const buttonWarningStyles = [styles.button_warning, Platform.OS === 'ios' && styles.button_ios];
  const buttonErrorStyles = [styles.button_error, Platform.OS === 'ios' && styles.button_ios];
  const buttonGroupStyles = [styles.button_group];

  const ListHeaderComponent = () => (
    <View style={contentContainerStyles}>
        <Type weight='medium' size='sm'>Rename this list using the edit button above.</Type>
        <Type weight='medium' size='sm'>Hold, drag & drop to change the order of this list.</Type>
        <Type weight='medium' size='sm'>Add specific khel to this list from the "Browse All" section.</Type>
        <Type weight='medium' size='sm'>Or surprise yourself an add randomly selected khels using "Generate more" button below.</Type>
      </View>
  );

  const ListFooterComponent = () => (
    <View style={buttonGroupStyles}>
    <Button buttonStyle={buttonStyles}>
      <View style={buttonContainerStyles}>
      <MaterialIcons name='add-box' size={theme.icon.default} />
        <Type color="title" weight="bold" size='md'>
          Generate more
        </Type>
      </View>
    </Button>

    <Button buttonStyle={buttonWarningStyles}>
      <View style={buttonContainerStyles}>
        <Ionicons 
          name='share-outline'
          size={theme.icon.md}
          color={theme.colors.invertedTitle}
        />
        <Type color="inverted" weight='bold' size='sm'>
          Share list
        </Type>
      </View>
    </Button>
    <Type color='error' size='sm' weight='medium'>Danger zone!</Type>
    <Button buttonStyle={buttonErrorStyles} onPress={deleteList}>
      <View style={buttonContainerStyles}>
        <Ionicons 
          name='trash'
          size={theme.icon.md}
          color={theme.colors.invertedTitle}
        />
        <Type color="inverted" weight='bold' size='sm'>
          Delete entire list
        </Type>
      </View>
    </Button>
  </View>
  );

  return (
    // <ScrollView contentContainerStyle={containerStyles} contentInsetAdjustmentBehavior="automatic">
    //   <View style={khelContainerStyles}>
    //     {list.khel.map((e: KhelProps, i: number) => renderListItem(e, i))}
    //   </View>
    // </ScrollView>
    <GestureHandlerRootView>
      <DraggableFlatList 
      data={list.khel} 
      renderItem={renderListItem} 
      keyExtractor={(item) => item.name}
      ListFooterComponent={ListFooterComponent} 
      ListHeaderComponent={ListHeaderComponent}
    />
    </GestureHandlerRootView>
  )
}

export default ListMoreInfo;