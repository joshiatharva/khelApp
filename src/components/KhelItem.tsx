import React from 'react';
import { View, Text } from 'react-native';

import { getColor } from "../utils/utils";
import { CategoryBadge } from './CategoryBadge';
import { ButtonGroup, Button } from '@rneui/base';

export enum KhelCategory {
  Pursuit = 'Pursuit',
  Individual = 'Individual',
  Mandal = 'Mandal',
  Team = 'Team',
  Sit = 'Sitting Down',
  Dand = 'Dand',
  Ekhel = 'E-Khel', 
};

export type KhelProps = {
  /** */
  name?: string;
  /** */
  meaning?: string;
  /** */
  aim?: string;
  /** */
  description?: string;
  /** */
  category: KhelCategory;
};

interface KhelItemProps extends KhelProps {
  addToListOnPress?: () => void;
  moreInfoOnPress?: () => void;
}

export const KhelItem = (
  {
    name,
    aim,
    category,
    addToListOnPress,
    moreInfoOnPress,
  }: KhelItemProps
) => {
  return (
    <View>
      <View>
        <Text>{name}</Text>
        <CategoryBadge>{category}</CategoryBadge>
        <Text>Aim: </Text><Text>{aim}</Text>
      </View>
      <ButtonGroup>
        <Button
          onPress={addToListOnPress}
          title="Add to List"
        />
        <Button
          onPress={moreInfoOnPress}
          title="More Info"
        />
      </ButtonGroup>
    </View>
  );
};

export default KhelItem;