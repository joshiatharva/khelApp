import { Button, ButtonGroup, Divider, Input } from '@rneui/base';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, Switch, View } from 'react-native';
import { Type } from '../components/Type';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext, ThemeInterface } from '../theme';
import { KhelListProps, useResponsiveStyles, createList, pickKhelByCategory, _post, KhelCategory } from '../utils';
// import { RootState } from '../store';
// import { useSelector, useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ListStackParamList } from '../navigation/ListStackNavigator';
// import { delAll } from '../features/listSlice';

type GenerateListScreenProps = NativeStackScreenProps<ListStackParamList, 'GenerateList'>

const base = (theme: ThemeInterface) => ({
  layout: {

  },
  menu_container: {
    borderRadius: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  row_container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  content_container: {
    padding: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  menu_section_container: {
    rowGap: theme.spacing.sm,
  },
  menu_item_container: {
    paddingVertical: theme.spacing.xxs,
    paddingHorizontal: 0,
  },
  input_container: {
    justifyContent: 'center' as const,
    alignSelf: 'center' as const,
    backgroundColor: theme.colors.altBackground,
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
  icon: {
    padding: theme.spacing.sm,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  icon_pressed: {
    backgroundColor: theme.colors.neutral400,

  },
  button: {
    width: '100%' as const,
    backgroundColor: theme.colors.background,
    borderRadius: 10,
  },
  button_ios: {
    borderCurve: 'continuous' as const,
  }, 
  button_group_styles: {
    flexDirection: 'row' as const,
    backgroundColor: theme.colors.neutral500,
    borderRadius: theme.spacing.xs,
  },
  divider: {
    paddingVertical: theme.spacing.xs,
    justifyContent: 'center' as const,
  },
  button_container: {
    padding: theme.spacing.xxs,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
});

export const GenerateList = ({ navigation, route }: GenerateListScreenProps) => {
  const theme = useContext(ThemeContext);
  const categories = Object.values(KhelCategory);
  const styles = useResponsiveStyles({ base });
  const [numOfKhel, setNumOfKhel] = useState(10);
  const [listName, setListName] = useState('');
  const [toggles, setToggles] = useState(Array(categories.length).fill(false));

  const searchRef = useRef<any>();

  const updateName = (name: string) => {
    setListName(name);
  }

  const generateList = (): void => {
    const searchCategories = toggles.some(i => i === true) ? categories.filter((_, i: number) => toggles[i] === true) : categories;
    console.log('searchCat', searchCategories);
    _post(searchCategories, numOfKhel, listName);
    // dispatch(delAll());
    navigation.pop();
  }

  const incrementCount = () => {
    setNumOfKhel(numOfKhel + 1);
  };

  const decrementCount = () => {
    setNumOfKhel(numOfKhel - 1)
  }

  const onValueChange = useCallback((v: boolean, i: number) => {
    setToggles((prevToggles) => {
      let newToggles = [...prevToggles];
      newToggles[i] = v;
      return newToggles;
    })
  }, [])

  const iconStyles = [styles.icon];
  const containerStyles = [styles.row_container];
  const listContainerStyles = [styles.menu_container];
  const contentContainerStyles = [styles.content_container];
  const listSectionContainerStyles = [styles.menu_section_container];
  const inputContainerStyles = [styles.input_container];
  const inputStyles = [styles.input];
  const noPaddingStyles = [styles.no_padding];
  const buttonStyles = [
    styles.button,
    Platform.OS === 'ios' && styles.button_ios,
  ];
  const buttonGroupStyles = [
    styles.button_group_styles,
    Platform.OS === 'ios' && styles.button_ios,
  ];
  const buttonContainerStyles = [styles.button_container];

  const dividerStyles = [styles.divider];

  return (
      <ScrollView contentInsetAdjustmentBehavior='automatic' contentContainerStyle={contentContainerStyles}>
        <View style={listContainerStyles}>
          <View style={listSectionContainerStyles}>
            <Type weight='bold' size='sm'>List name:</Type>
            <Input 
              inputContainerStyle={inputContainerStyles}
              inputStyle={inputStyles}
              containerStyle={noPaddingStyles}
              placeholder='List here'
              renderErrorMessage={false}
              onChangeText={updateName}
            />
          </View>
          <View style={listSectionContainerStyles}>
            <Type weight='bold' size='sm'>Number of khels:</Type>
            <View style={containerStyles}>
              <Type color='title' weight='bold'>{numOfKhel}</Type>
              <View style={buttonGroupStyles}>
                <Button type='clear' onPress={decrementCount}>
                  <Ionicons name='remove' size={theme.icon.sm} />
                </Button>
                <View style={dividerStyles}>
                  <Divider orientation='vertical' style={dividerStyles}/>
                </View>
                <Button type='clear' onPress={incrementCount}>
                  <Ionicons name='add' size={theme.icon.sm} />
                </Button>
              </View>
            </View>
            <View style={listSectionContainerStyles}>
              <Type weight='bold' size='sm'>From these categories:</Type>
              <View style={listSectionContainerStyles}>
                {categories.map((el, i) => (
                  <View style={containerStyles} key={i}>
                    <Type color='title' weight='bold'>{el}</Type>
                    <Switch value={toggles[i]} onValueChange={(val) => onValueChange(val, i)}/>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button buttonStyle={buttonStyles} onPress={generateList}>
            <View style={buttonContainerStyles}>
              <MaterialIcons name='add-box' size={theme.icon.default}/>
              <Type weight='bold' color='title' size='md'>Generate</Type>
            </View>
          </Button>
        </View>
      </ScrollView>
    );
}

export default GenerateList;