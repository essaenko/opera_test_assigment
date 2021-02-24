import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { blockSlice } from './block/block.slice';

export const store = configureStore({
  reducer: combineReducers({
    block: blockSlice.reducer,
  }),
});