import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { createStatuses, loadStatuses } from '../../constants';
import { EventsState } from './types';

const initialState: EventsState = {
  events: {},
  effects: {
    loadEventListEffect: {
      status: loadStatuses.NOT_LOADING,
      error: null,
    },
    createEventEffect: {
      eventId: null,
      status: createStatuses.NOT_CREATING,
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

export const createEvent = createAsyncThunk(
  'events/createEvent',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async ({ name, description, location: { latitude, longitude } }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/event/create`,
      { name, description, latitude, longitude }
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

    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.events[action.payload.id] = action.payload;
      state.effects.createEventEffect.status = createStatuses.CREATION_SUCCESS;
    });
  },
});

export default eventSlice.reducer;
