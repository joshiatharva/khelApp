import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, View, Text, Platform, Alert, Pressable, Switch } from "react-native";

import khel from '../../assets/khel.json';
import { Khel, Type } from "../components";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../navigation/TabNavigator";
import { ThemeContext, ThemeInterface } from "../theme";
import { useResponsiveStyles, addToList, createList, KhelItemProps, KhelProps, _get, KhelListProps, KhelCategory, getListIndexes, } from "../utils";
import { useHeaderHeight } from '@react-navigation/elements';

// import { useDispatch, useSelector } from 'react-redux';
// import { add, update } from '../features/listSlice';
// import { RootState } from "../store";

import MoreInfo from "./MoreInfo";
import { BrowseStackParamList } from "../navigation/BrowseStackNavigator";
import { Dialog, Input, SearchBar } from "@rneui/base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { debounce } from "lodash";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Easing, useDerivedValue } from 'react-native-reanimated';

export type BrowseScreenProps = CompositeScreenProps<
  NativeStackScreenProps<BrowseStackParamList>,
  BottomTabScreenProps<BottomTabParamList, 'Browse'>
>;

const base = (theme: ThemeInterface) => ({
  container: {
    padding: theme.spacing.xs,
    flexDirection: 'column' as const,
  },
  list_container: {
    paddingTop: theme.spacing.sm,
  },
  toggle_container: {
    justifyContent: 'space-between' as const,
    flexDirection: 'row' as const,
  },
  header_container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    // width: '100%' as const,
    // overflow: 'hidden' as const,
  },
  animated_container: {
    overflow: 'hidden' as const,
    width: '100%' as const,
  },
  input_container: {
    justifyContent: 'center' as const,
    alignSelf: 'center' as const,
    backgroundColor: theme.colors.background,
    borderRadius: theme.spacing.xs,
    maxHeight: theme.spacing.xl,
    borderBottomWidth: 0,
    margin: 0,
  },
  input: {
    overflow: 'hidden' as const,
    padding: theme.spacing.sm,
  },
  no_padding: {
    paddingHorizontal: 0,
  },
})

export const Browse = ({ navigation, route }: BrowseScreenProps) => {
  const toggleGroup = Object.fromEntries(
    Object.values(KhelCategory).map((category: string) => [category, false])
  );

  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<string>();
  const [searchString, setSearchString] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isMenuRendered, setIsMenuRendered] = useState(false);
  const [categories, setCategories] = useState({...toggleGroup});
  const [segment, setSegment] = useState(0);

  const theme = useContext(ThemeContext);

  const updateName = debounce(useCallback((value: string) => {
    setSearchString(value);
  }, []), 200);



  const flatlistData = useMemo(() => {
    let filteredData = khel;
    if (searchString) {
      filteredData = khel.filter(e => e.name.includes(searchString.toLowerCase()))
    }
    return filteredData.filter(e => {
      
    });
  }, [])

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setIsMenuRendered(isMenuRendered => !isMenuRendered);
          }
        }>
        {isMenuRendered ? ( 
          <Ionicons name='filter-circle' size={theme.icon.lg} color={theme.colors.blue}/>
        ): (
          <Ionicons name='filter-circle-outline' size={theme.icon.lg} color={theme.colors.blue}/>
        )}
          
        </Pressable>
      )
    })

  }, [isMenuRendered, categories]);

  const headerHeight = useHeaderHeight();
  const menuHeight = useRef<number>(0);

  const styles = useResponsiveStyles({ base });

  const openListOptions = async (name: string, khel: KhelProps) => {
    const data = await _get();
    const khelListOptions: any = data.result.map((list: KhelListProps) => { 
      return {
        text: list.name,
        onPress: addToList(khel, list),
      }
    });
    const listIndex = await getListIndexes();
    const options = khelListOptions.concat(
      [
        { 
          text: 'New List',
          onPress: () => createList(listIndex, khel),
        },
        { 
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
      }
      ])
    return Platform.OS === 'ios' ? (
      Alert.alert(name, 'Select a list to add this khel', 

      )) : setDialogVisible(true);
  };

  const moreInfo = (k: KhelProps) => {
    navigation.push('MoreInfo', { item: JSON.stringify(k), name: k.name });
  }

  const toggleCategoryChange = (key: string, value: boolean) => {
    setCategories(prevState => ({...prevState, [key]: value }));
  }

  const renderListItem = useCallback(({ item: { name, category, aim, meaning, description, addToListOnPress, moreInfoOnPress } }: { item: KhelItemProps }) => (
      <Khel
        name={name}
        category={category}
        aim={aim}
        meaning={meaning}
        description={description}
        addToListOnPress={openListOptions}
        moreInfoOnPress={moreInfo}
      />
  ), []);


  const contentContainerStyles = [styles.container];

  const toggleContainerStyles = [styles.toggle_container];
  const inputContainerStyles = [styles.input_container];
  const inputStyles = [styles.input];
  const noPaddingStyles = [styles.no_padding];

  const HeaderMenu = ({

  }) => {
    const height = useSharedValue(0);
    const derivedHeight = useDerivedValue(() => 
      withTiming(
        height.value * Number(isMenuRendered), 
        {
          duration: 500,
        }
      ),
    );
  
    const animatedStyles = useAnimatedStyle(() => ({
      height: derivedHeight.value,
    }));
    const animatedContainerStyles = [styles.animated_container, animatedStyles];
    const headerContainerStyles = [styles.header_container];
    return (
      <Animated.View 
          style={animatedContainerStyles}
        >
        <View 
          style={headerContainerStyles}
          onLayout={(e) => { height.value = e.nativeEvent.layout.height }} 
        >
          <Type weight="bold" size="sm">Search:</Type>
          <Input
            inputContainerStyle={inputContainerStyles}
            inputStyle={inputStyles}
            containerStyle={noPaddingStyles}
            placeholder='List here'
            renderErrorMessage={false}
            onChangeText={updateName}
            value={searchString}
          />
          <Type weight="bold" size="sm">Sort method:</Type>
          <SegmentedControl
            values={['A to Z', 'Randomise', 'Categorical']}
            selectedIndex={segment}
            onChange={(event) => setSegment(event.nativeEvent.selectedSegmentIndex)}
          />
          <Type weight="bold" size="sm">Categories:</Type>
          {Object.keys(categories).map((category) => (
            <View style={toggleContainerStyles} key={category}>
              <Type weight="medium" color="title">{category}</Type>
              <Switch
                onValueChange={(value: boolean) => toggleCategoryChange(category, value)}
                value={categories[category]}
              />
            </View>
          ))}
          </View>

        </Animated.View>
    );

  }

  const renderKhelList = () => (
      <FlatList
        ListHeaderComponent={<HeaderMenu />}
        contentInsetAdjustmentBehavior="automatic"
        data={khel}
        contentContainerStyle={contentContainerStyles}
        renderItem={renderListItem}
        keyExtractor={(_, index) => index.toString()}
      />
    );

  return renderKhelList();

};

export default Browse;