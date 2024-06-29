import { SELECT, DELETE, INSERT } from "../store";
import { KhelProps, KhelListProps } from ".";
import khel from '../../assets/khel.json';
import { sampleSize, isString } from "lodash";
// import { useDispatch, useSelector } from "react-redux";
// import { add, del, delAll, upd } from "../features/listSlice";
/**
 * 
 */

export const shareList = ({
    name,
    categories,
    id,
    khel,
}: KhelListProps): string => {
  const msg = `${name}\n`;
  const khels = Array.from(khel.entries())
    .reduce((acc, cur) => acc + `${cur[0]}.) ${cur[1]['name']} (${cur[1]['category']})\n` , msg);
  return msg;
};

/**
 * 
 */

export const addToList = (k: KhelProps, l?: KhelListProps, fn: string | number = '') => {
  if (l) {
    const listOfKhels = l.khel;
    listOfKhels.push(k);
    return l;
  }
  return createList(fn, k);
};

/**
 * 
 */

export const getListIndexes = async () => {
  const data = (await SELECT()).result;
  const testExp = new RegExp("^List [0-9+]")
  const indexes = data.map((el: KhelListProps) => el.name).filter((name: string) => testExp.test(name));
  return indexes.map(({ name }: { name: string }) => Number.parseInt(name.replace('List ', ''))).sort().pop();
}

export const createList = (lN: string | number, k: KhelProps | Array<KhelProps>) => {
  const newList: KhelListProps = {
    name: isString(lN) ? lN : generateName(lN),
    id: '',
    categories: [],
    khel: Array.isArray(k) ? k : [k],
  };
  newList.id = generateId(newList.name);
  newList.categories = newList.khel.map(e => e.category).filter((e, i, a) => a.indexOf(e) === i);
  return newList;
};

export const pickKhelByCategory = (s: number, arr: Array<string>) => {
  const filteredKhel = khel.filter((k) => arr.includes(k.category));
  console.log('khels', filteredKhel, sampleSize(filteredKhel, s))
  return sampleSize(filteredKhel, s);
};

export const generateName = (i: number) => `List ${i+1}`;

export const generateId = (lN: string) => {
  let hash = 0, i, chr;
  if (lN.length === 0) {
    return String(hash);
  }
  for (i = 0; i < lN.length; i++) {
    chr = lN.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return String(hash);
};
/**
 * 
 * example: { categories: [],
 *            1: {},
 *            2: {},
 *            3: {}, 
 *          }
 */

export const _get = async () => {
  const res = await SELECT();
  return res;
};

export const _post = async (arr: string[], len: number, name: string) => {
  // const data = useSelector((state: RootState) => state.lists);
  // const dispatch = useDispatch();
  const data = (await SELECT()).result;
  const khel =  pickKhelByCategory(len, arr);
  let newList;
  if (name.length <= 0) {
    console.log('name', name);
    const listNames = data.filter((list: KhelListProps) => list.name.startsWith('List'));
    const finalListIndex = listNames.map((i: KhelListProps) => i.name.replace('List ', '')).sort()[listNames.length-1];
    newList = createList((Boolean(finalListIndex) ? (Number(finalListIndex) + 1) : 1), khel);
    console.log('newList:', newList);
  } else {
    console.log('name', name);
    newList = createList(name, khel);
    console.log('newList:', newList);
  }
  // dispatch(add(newList));
  data.push(newList);
  const result = await INSERT(data);
  return result;
};

export const _delete = async (list: KhelListProps) => {
  // const dispatch = useDispatch();
  // dispatch(del(list.id));
  const data = (await SELECT()).result;
  console.log(data.filter(({ id }: { id: string }) => id !== list.id));
  const result = await INSERT(data.filter(({ id }: { id: string }) => id !== list.id));
  return result;
};

export const _put = async (khel?: KhelProps, list?: KhelListProps) => {
  // const dispatch = useDispatch();
  const data = (await SELECT()).result;
  let newList: KhelListProps;
  if (list) {
    newList = list;
    if (khel) {
      newList.khel.push(khel)
    }

  } else if (khel) {
    const ind = await getListIndexes();
    newList = createList(ind, khel);
  }
  const newData = data.map((item: KhelListProps) => item.id === newList.id ? newList : item);
  const result = await INSERT(newData);
  return result;
}

export const _deleteAll = async () => {
  // const dispatch = useDispatch();
  // dispatch(delAll());
  return await DELETE();
}