import { KhelCategory, KhelProps } from "../components/KhelItem";
import { KhelListProps } from "../components/KhelList";


export const getColor = (category: KhelCategory): string => {
    switch (category) {
      case KhelCategory.Pursuit:
        return '#ff453a';
      case KhelCategory.Individual:
        return '#ff9d0a';
      case KhelCategory.Mandal:
        return '#30d158';
      case KhelCategory.Team:
        return '#0a84ff';
      case KhelCategory.Sit:
        return '#40c8e0';
      case KhelCategory.Dand:
        return '#ff375f';
      case KhelCategory.Ekhel:
        return '#ffd60a';
    }
};

/**
 * 
 * example: { categories: [],
 *            1: {},
 *            2: {},
 *            3: {}, 
 *          }
 */

export const shareList = (khelList: KhelListProps): string => {
  const msg = `${khelList.get('name')}\n`;
  const khels = Array.from(khelList.entries())
    .filter((el) => el[0] !== 'name' && el[0] !== 'categories')
    .reduce((acc, cur) => acc + `${cur[0]}.) ${cur[1]['name']} (${cur[1]['category']})\n` , msg);
  return msg;
};

export default { getColor, shareList };