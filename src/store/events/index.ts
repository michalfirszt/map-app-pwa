import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { loadStatuses } from '../../constants';

type Event = {
  id: number;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  description: string;
  active: boolean;
};

type State = {
  events: { [key: number]: Event };
  effects: {
    loadEventListEffect: {
      status: string;
      error: null | string;
    };
  };
};

const initialState: State = {
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
      state.events = action.payload.reduce(
        (list: { [key: number]: Event }, event: Event) => (
          (list[event.id] = event), list
        ),
        {}
      );
      state.effects.loadEventListEffect.status = loadStatuses.LOAD_SUCCESS;
    });
  },
});

export default eventSlice.reducer;
