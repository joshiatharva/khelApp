import React, { ReactNode } from 'react';
import { Platform, View } from "react-native";
import { ThemeInterface } from '../../theme';
import { KhelCategory, useResponsiveStyles } from '../../utils';
import { Type } from '../typography';

const base = (theme: ThemeInterface) => ({
  container: {
    borderRadius: theme.categoryBadge.borderRadius,
    paddingHorizontal: theme.categoryBadge.paddingHorizontal,
    paddingVertical: theme.categoryBadge.paddingVertical,
  },
  container_ios: {
    borderCurve: 'continuous' as const,
  },
  pursuit: {
    backgroundColor: theme.colors.red,
  },
  individual: {
    backgroundColor: theme.colors.orange,
  },
  mandal: {
    backgroundColor: theme.colors.green,
  },
  team: {
    backgroundColor: theme.colors.blue,
  },
  sit: {
    backgroundColor: theme.colors.teal,
  },
  dand: {
    backgroundColor: theme.colors.pink,
  },
  e_khel: {
    backgroundColor: theme.colors.yellow,
  },
  text: {
    color: theme.colors.text,
  },
});

type CategoryProps = {
  category: string;
}

export const CategoryBadge = ({ category }: CategoryProps) => {
  const styles = useResponsiveStyles({ base });
  const badgeStyles = [
    styles.container,
    Platform.OS === 'ios' && styles.container_ios,
    category.toLowerCase() === KhelCategory.Pursuit.toLowerCase() && styles.pursuit,
    category.toLowerCase() === KhelCategory.Individual.toLowerCase() && styles.individual,
    category.toLowerCase() === KhelCategory.Mandal.toLowerCase() && styles.mandal,
    category.toLowerCase() === KhelCategory.Team.toLowerCase() && styles.team,
    category.toLowerCase() === KhelCategory.Sit.toLowerCase() && styles.sit,
    category.toLowerCase() === KhelCategory.Dand.toLowerCase() && styles.dand,
    category.toLowerCase() === KhelCategory.EKhel.toLowerCase() && styles.e_khel,
  ];
  const textStyles = [styles.text];
  return (
    <View style={badgeStyles}>
      <Type style={textStyles} size='xs' weight='bold' color='category'>{category}</Type>
    </View>
  )
};

export default { CategoryBadge };