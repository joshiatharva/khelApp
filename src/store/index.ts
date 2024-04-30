// import { configureStore, applyMiddleware, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KhelListProps } from 'src/utils';
// import { 
//   persistStore, 
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import  { logger } from 'redux-logger';
// import listReducer from '../features/listSlice';
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }
// const persistedReducer = persistReducer(persistConfig, listReducer);

// const middleware = [logger];

// export const store = configureStore({
//   reducer: listReducer,
//   persistedReducer,
//   (getDefaultMiddleware) => 
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   })
// });

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// export const persistor = persistStore(store);

// type RetrievalType = Promise<{ result: KhelListProps[]} | { error: string }>;
// type AssertionType = Promise<{ result: string} | { error: any }>

export const SELECT = async ()=> {
  try {
    const lists = await AsyncStorage.getItem('lists');
    if (lists) {
      return { result: JSON.parse(lists) }
    } else {
    /**
     * No lists stored
     */
      return { result: [] };
    }
  } catch (err: any) {
    return { error: err };
  }
}
export const INSERT = async (lists: Array<KhelListProps>) => {
  try {
    const str = JSON.stringify(lists);
    await AsyncStorage.setItem('lists', str);
    return { result: 'success' };
  } catch (err) {
    return { error: err };
  }
}

export const DELETE = async () => {
  try {
    await AsyncStorage.clear();
    return { result: 'success' };
  } catch (err) {
    return { error: err };
  }

}