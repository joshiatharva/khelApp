import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList, Platform, Pressable, ScrollView, View } from "react-native";
import { ListStackParamList } from "src/navigation/ListStackNavigator"
import { KhelItemProps, KhelListProps, KhelProps, _delete, _put, useResponsiveStyles } from "../utils";
import { Button, Input } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Khel, KhelList, Type } from "../components";
import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeInterface } from "../theme";
import { useHeaderHeight } from '@react-navigation/elements';
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store";
// import { del, delAll, upd } from "../features/listSlice";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DraggableFlatList, { RenderItemParams, ShadowDecorator, ScaleDecorator, OpacityDecorator } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { InputDialog } from "../components/input-dialog";
import { debounce } from "lodash";

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
    paddingHorizontal: theme.spacing.xs,

  },
  container: {
    paddingHorizontal: theme.spacing.xs,
  },
  khel_container: {
    // borderRadius: 20,
    // backgroundColor: theme.colors.background,
    // alignItems: 'flex-start' as const,
    // padding: theme.spacing.md,
    gap: theme.spacing.md, 
  },
  header_container: {
    padding: theme.spacing.xs,
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

  const list = JSON.parse(route.params.item);

  const [khel, setKhel] = useState<Array<KhelProps>>(list.khel);
  const [listName, setListName] = useState<string>(list.name);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => setDialogVisible(true)}
        >
          <Ionicons name={'create-outline'} size={theme.icon.lg} color={theme.colors.blue} />
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={goBack}>
          <Ionicons name="close-circle-outline" color={theme.colors.blue} size={theme.icon.lg}/>
        </Pressable>
      ),
      title: listName,
    });
    console.log(listName);
  }, [listName]);
  

  const styles = useResponsiveStyles({ base });

  const removeOnPress = (index: number) => {
    const newKhel = list.khel.filter((e : KhelProps, i : number) => i !== index);
    const newList = {...list, khel: newKhel };
    // dispatch(upd(newList));
  }

  const updateListItem = () => {
    const newList = {
      ...list,
      name: listName,
    };
    _put(newList)
  }

  const goBack = useCallback(() => {
    updateListItem();
    navigation.goBack();
  }, [])

  const deleteList = () => {
    // dispatch(delAll());
    _delete(list).then(() => {
      navigation.navigate('Lists');
    });
  }

  const onCancelEvent = useCallback(() => {
    setDialogVisible(false);
  }, []);

  const onFireEvent = (value: string) => {
    setListName(value);
    setDialogVisible(false);
  };

  const ChangeNameDialog = () => <InputDialog
    placeholder={list.name}
    title="Rename List"
    visible={dialogVisible}
    onCancelEvent={onCancelEvent}
    onFireEvent={onFireEvent}
  />;


  const renderListItem = useCallback(
  ({ 
    item: { name, aim, category, meaning, description }, 
    drag,
    getIndex,
    isActive, 
  } : RenderItemParams<KhelProps>) => (
    <ShadowDecorator>
      <ScaleDecorator activeScale={1.025}>
      <Khel
      name={name}
      category={category}
      aim={aim}
      meaning={meaning}
      description={description}
      removeOnPress={() => removeOnPress(getIndex()!)}
      moreInfoOnPress={moreInfo}
      onLongPress={drag}
    />
    </ScaleDecorator>
    </ShadowDecorator>
  ), []);

  const moreInfo = (k: KhelProps) => {
    navigation.navigate('MoreInfo', { item: JSON.stringify(k), name: k.name });
  }

  const editKhelOrder = ({ data } : { data: Array<KhelProps> })  => {
    setKhel(data);
  }

  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios, 
  ];

  const containerStyles = [styles.container];
  const khelContainerStyles = [styles.khel_container];
  const headerContainerStyles = [styles.header_container];
  const buttonContainerStyles = [styles.button_container];
  const buttonWarningStyles = [styles.button_warning, Platform.OS === 'ios' && styles.button_ios];
  const buttonErrorStyles = [styles.button_error, Platform.OS === 'ios' && styles.button_ios];
  const buttonGroupStyles = [styles.button_group];

  const ListHeaderComponent = () => (
    <View style={headerContainerStyles}>
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
    <GestureHandlerRootView style={containerStyles}>
      <ChangeNameDialog />
      <DraggableFlatList 
        contentInsetAdjustmentBehavior="automatic"
        data={khel}
        onDragEnd={editKhelOrder}
        renderItem={renderListItem} 
        keyExtractor={(item) => item.name}
        ListFooterComponent={ListFooterComponent} 
        ListHeaderComponent={ListHeaderComponent}
      />
    </GestureHandlerRootView>
  )
}

export default ListMoreInfo;