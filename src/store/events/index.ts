import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { loadStatuses } from '../../constants';
import { EventsState } from './types';

const initialState: EventsState = {
  events: {},
  effects: {
    loadEventListEffect: {
      status: loadStatuses.NOT_LOADING,
      error: null,
    },
  },
};

export const loadEventList = createAsyncThunk(
  'events/loadEventList',
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/event/list`
    );

    return response.data;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadEventList.fulfilled, (state, action) => {
      state.events = action.payload;
      state.effects.loadEventListEffect.status = loadStatuses.LOAD_SUCCESS;
    });
  },
});

export default eventSlice.reducer;
