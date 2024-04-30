import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { KhelListProps } from '../utils';
import { RootState } from 'src/store';
import { Khel } from 'src/components/Khel';

interface ListState {
    lists: KhelListProps[]
}

const initialState: ListState = {
    lists: [],
    
}

/**
 * ACTIONS:
 * - Make a new list
 * - Delete list
 * - Add a khel 
 * - Remove a khel
 * - Rearrange khel order
 */

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        add: ({ lists }, action: PayloadAction<KhelListProps>) => {
            lists.push(action.payload);
            console.log('add', lists);
        },
        del: ({ lists }, action: PayloadAction<string>) => {
            const id = action.payload;
            lists = lists.filter(item => item.id !== id);
            console.log('remove', lists);
        },
        upd: ({ lists }, action: PayloadAction<KhelListProps>) => {
            const obj  = action.payload;
            lists = lists.map(p => p.id === obj.id ? obj : p);
            console.log(lists);
        },
        delAll: ({ lists }) => {
            lists = [];
            console.log(lists);
        },
    },
});

export const { add, upd, del, delAll } = listSlice.actions;

export const get = (state: RootState) => state.lists;

export default listSlice.reducer;