import { createSlice } from '@reduxjs/toolkit';

import { fetchLatestBlock, searchBlock } from './block.actions';
import { IBlock, IStore } from '../types';

export const blockSlice = createSlice({
  name: 'block',
  initialState: {
    loaded: false,
    loading: false,
    data: {},
  },
  reducers: {},
  extraReducers: {
    [fetchLatestBlock.pending.toString()]: (state) => { 
      return { ...state, loading: true, loaded: false, error: null, };
    },
    [fetchLatestBlock.fulfilled.toString()]: (_, action) => {
      return { loaded: true, loading: false, data: action.payload.data, error: action.payload.error }
    },
    [fetchLatestBlock.rejected.toString()]: () => {
      return { loaded: false, loading: false, data: {}, error: `There is something wrong with service`, }
    },
    [searchBlock.pending.toString()]: (state) => {
      return { ...state, loading: true, loaded: false, error: null, };
    },
    [searchBlock.fulfilled.toString()]: (_, action) => {
      return { loaded: true, loading: false, data: action.payload.data, error: action.payload.error }
    },
    [searchBlock.rejected.toString()]: () => {
      return { loaded: false, loading: false, data: {}, error: `Can't load block by this number`, }
    }
  }
})

export const selectBlock = (state: IStore): IBlock => state.block.data;

export const selectBlockStatus = (state: IStore): {
  loaded: boolean;
  loading: boolean;
  error?: string;
} => ({ loaded: state.block.loaded, loading: state.block.loading, error: state.block.error });