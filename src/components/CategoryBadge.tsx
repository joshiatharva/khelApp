import React from 'react';
import { Text, View } from "react-native";

export enum KhelCategory {
    Pursuit = 'Pursuit',
    Individual = 'Individual',
    Mandal = 'Mandal',
    Team = 'Team',
    Sit = 'Sitting Down',
    Dand = 'Dand',
    Ekhel = 'E-Khel', 
};

export type CategoryProps = {
  children: string;
}

export const CategoryBadge = ({ children }: CategoryProps) => {
  return (
    <View>
      <Text>{children}</Text>
    </View>
  )
};

export default { CategoryBadge };