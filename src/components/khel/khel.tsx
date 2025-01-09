import React, { useCallback, useContext } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { CategoryBadge } from '..';
import { ThemeContext, ThemeInterface } from '../../theme';
import { Type } from '..';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import { KhelItemProps, addToList, useResponsiveStyles } from '../../utils';

const base = (theme: ThemeInterface) => ({
  container: {
    borderRadius: 20,
    margin: theme.spacing.xs,
    flex: 1,
  },
  content_container: {
    alignItems: 'flex-start' as const,
    padding: theme.spacing.md,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: theme.spacing.xs, 
    backgroundColor: theme.colors.background,
  },
  container_ios: {
    borderCurve: 'continuous' as const,
  },
  footer_button_left: {
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderColor: theme.colors.neutral300,
    backgroundColor: theme.colors.invertedBackground,
    padding: theme.spacing.xs,
    alignSelf: 'stretch' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  footer_button_right: {
    borderLeftWidth: 0.5,
    borderTopWidth: 1,
    borderColor: theme.colors.neutral300,
    backgroundColor: theme.colors.invertedBackground,
    padding: theme.spacing.xs,
    alignSelf: 'stretch' as const,
    alignItems: 'center' as const,
    overflow: 'hidden' as const,
    flex: 1,
  },
  footer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: theme.colors.neutral300,
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
  },
  text_container: {
    flexDirection: 'row' as const,
  },
  button_container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xs,
  },
  pressable_container: {
    padding: theme.spacing.xxs,
  }
});

export const Khel = (
  {
    name,
    aim,
    category,
    meaning, 
    description,
    addToListOnPress,
    moreInfoOnPress,
    removeOnPress,
    ...props 
  }: KhelItemProps
) => {

  const styles = useResponsiveStyles({ base });

  const theme = useContext(ThemeContext);

  const containerStyles = [
    styles.container,
    Platform.OS === 'ios' && styles.container_ios,
  ];
  const contentContainerStyles = [styles.content_container];
  const footerStyles = [styles.footer];
  const footerButtonLeftStyles = [styles.footer_button_left];
  const footerButtonRightStyles = [styles.footer_button_right];
  const buttonContainerStyles = [styles.button_container];
  const pressableContainerStyles = [styles.pressable_container];

  const addToListOnPressHandler = () => {
    if (addToListOnPress) {
      addToListOnPress(name, { name, aim, category, meaning, description });
    }
  };

  const moreInfoOnPressHandler = () => {
    if (moreInfoOnPress) {
      moreInfoOnPress({ name, aim, category, meaning, description });
    }
  }

  const removeOnPressHandler = () => {
    if (removeOnPress) {
      removeOnPress();
    }
  }

  return (
    <Pressable onPress={moreInfoOnPressHandler} {...props}>
      <View style={containerStyles}>
      <View style={contentContainerStyles}>
        <Type weight='bold' color='title'>{name}</Type>
        <CategoryBadge category={category} />
        {/* <View style={{ 
          flexDirection: 'row', 
          paddingRight: theme.spacing.xl, 
          flexWrap: 'wrap',  
        }}> */}
          <Text>
            <Type size='sm' weight='medium'>
              <Type weight='bold' color='title' size='sm'>Aim: </Type>
              {aim}
            </Type>
          </Text>
        {/* </View> */}
      </View>
      <View style={footerStyles}>
      {addToListOnPress && !removeOnPress ? (
        <Pressable
        style={footerButtonLeftStyles}
        onPress={addToListOnPressHandler}
      >
        <View style={buttonContainerStyles}>
          <Ionicons 
            name='add-circle-outline' 
            color={theme.colors.text}
            size={theme.icon.default}
          />
          <Type weight='medium' size='sm'>Add to List</Type>
        </View>
      </Pressable>
      ) : (
        <Pressable
          style={footerButtonLeftStyles}
          onPress={removeOnPressHandler}
        >
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='trash-outline' 
              color={theme.colors.text}
              size={theme.icon.default}
            />
            <Type weight='medium' size='sm'>Remove</Type>
          </View>
        </Pressable>
      )}
        <Pressable
          style={footerButtonRightStyles}
          onPress={moreInfoOnPressHandler}
        >
          <View style={buttonContainerStyles}>
            <Ionicons 
              name='information-circle-outline' 
              color={theme.colors.text} 
              size={theme.icon.default}
              
            />
            <Type weight='medium' size='sm'>More Info</Type>
          </View>
        </Pressable>
      </View>
    </View>
    </Pressable>
  );
};

export default Khel;