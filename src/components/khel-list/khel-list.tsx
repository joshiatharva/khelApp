import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, Text, Button, Pressable, Platform } from 'react-native';
import { shareList, useResponsiveStyles, KhelListItemProps } from "../../utils";
import { CategoryBadge } from "../category-badge";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Type } from "../typography";
import { ThemeContext, ThemeInterface } from "../../theme";

const base = (theme: ThemeInterface) => ({
  container: {
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    margin: theme.spacing.xs,
  },
  content_container: {
    alignItems: 'flex-start' as const,
    padding: theme.spacing.md,
    gap: theme.spacing.xs, 
  },
  container_ios: {
    borderCurve: 'continuous' as const,
  },
  footer_button_left: {
    borderRightWidth: 0.5,
    borderColor: theme.colors.neutral300,
    padding: theme.spacing.xs,
    alignSelf: 'stretch' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  footer_button_right: {
    borderLeftWidth: 0.5,
    borderColor: theme.colors.neutral100,
    padding: theme.spacing.xs,
    alignSelf: 'stretch' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: theme.colors.neutral100,
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
  },
  text_container: {
    flexDirection: 'row' as const,
  },
  button_container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: theme.spacing.xxs,
  },
  category_container: {
    flexDirection: 'row' as const,
    gap: theme.spacing.xs,
    flexWrap: 'wrap' as const,
  },
});

export const KhelList = (
  { 
    name,
    id,
    categories,
    khel, 
    infoFn, 
    shareFn,
  }: KhelListItemProps
) => {

  const styles = useResponsiveStyles({ base });
  const containerStyles = [
    styles.container,
    Platform.OS === 'ios' && styles.container_ios,
  ];
  const contentContainerStyles = [styles.content_container];
  const footerStyles = [styles.footer];
  const footerButtonLeftStyles = [styles.footer_button_left];
  const footerButtonRightStyles = [styles.footer_button_right];
  const buttonContainerStyles = [styles.button_container];
  const categoryContainerStyles = [styles.category_container];

  const theme = useContext(ThemeContext);
  
  const renderKhelList = () => (
    <View>
      {khel.map((e, i) => (
        <Type size="sm" weight="medium">{i+1}: {e.name} ({e.category})</Type>
      ))}
    </View>
  );

  const shareListCallback = useCallback(() => {
    if (shareFn) {
      shareFn()
    }
  }, [shareFn]);

  const infoCallback = useCallback(() => {
    if (infoFn) {
      infoFn()
    }
  }, [infoFn]);

  return (
  <Pressable onPress={infoCallback}>
    <View style={containerStyles} key={id}>
      <View style={contentContainerStyles}>
        <Type color='title' weight="bold" size="md">{name}</Type>
        <View style={categoryContainerStyles}>
          {categories.map((category) => (
            <CategoryBadge category={category}/>
          ))}
        </View>
        <View>
          {renderKhelList()}
        </View>
      </View>
      <View style={footerStyles}>
        <Pressable
          onPress={shareListCallback}
          style={footerButtonLeftStyles}
        >
          <View style={buttonContainerStyles}>
            <Ionicons name='share-outline' 
              color={theme.colors.text}
              size={theme.icon.default}/>
            <Type weight='medium' size='sm'> 
              Share
            </Type>
          </View>
        </Pressable>

        <Pressable
          onPress={infoCallback}
          style={footerButtonRightStyles}
        >
          <View style={buttonContainerStyles}>
          <Ionicons name='information-circle-outline' color={theme.colors.text}
            size={theme.icon.default}/>
          <Type weight='medium' size='sm'>
            More info
          </Type>
          </View>
        </Pressable>
      </View>
    </View>
  </Pressable>
  )
}