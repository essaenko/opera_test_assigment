import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleResponse, IAPIResult } from '../../utils/request.utils';

export const fetchLatestBlock = createAsyncThunk(
  'block/fetchLatestBlock',
  async (): Promise<IAPIResult> => {
    return await handleResponse(await fetch('/api/block/latest'));
  }
)

export const searchBlock = createAsyncThunk(
  'block/searchBlock',
  async (blockID: number): Promise<IAPIResult> => {
    return await handleResponse(await fetch(`/api/block/${blockID}`));
  }
)