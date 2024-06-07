import { PressableProps } from "react-native";

export type KhelListProps = {
    name: string;

    id: string;

    categories: string[];

    khel: KhelProps[];
};

export type KhelProps = {
  /** */
  name: string;
  /** */
  meaning: string;
  /** */
  aim: string;
  /** */
  description: string;
  /** */
  category: string;
};

export interface KhelItemProps extends KhelProps, Omit<PressableProps, 'style'>{
  addToListOnPress?: (val1: any, val2: any) => void;
  moreInfoOnPress?: (val: any) => void;
  removeOnPress?: () => void; 
};

export interface KhelListItemProps extends KhelListProps, Omit<PressableProps, 'style'|'id'> {
  infoFn: () => void;
  shareFn: () => void;
};

export const categories = ['Pursuit', 'Individual', 'Mandal', 'Team', 'Sitting Down', 'Dand', 'E-Khel'];

export enum KhelCategory {
  Pursuit = 'Pursuit',
  Individual = 'Individual',
  Mandal = 'Mandal',
  Team = 'Team',
  Sit = 'Sitting down',
  Dand = 'Dand',
  EKhel = 'E-khel', 
};