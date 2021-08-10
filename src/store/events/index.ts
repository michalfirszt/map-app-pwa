import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { EventFormData } from '../../components/EventForm';
import { createStatuses, deleteStatuses, loadStatuses } from '../../constants';
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
    deleteEventEffect: {
      status: deleteStatuses.NOT_DELETING,
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
  async ({
    name,
    description,
    location: { latitude, longitude },
  }: EventFormData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/event/create`,
      { name, description, latitude, longitude }
    );

    return response.data;
  }
);

export const deleteEvent = createAsyncThunk(
  'events/deleteEvent',
  async (eventId: number) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/event/${eventId}/delete`
    );

    return response.data;
  }
);

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadEventList.pending, (state) => {
      state.effects.loadEventListEffect.status = loadStatuses.LOADING;
    });
    builder.addCase(loadEventList.fulfilled, (state, action) => {
      state.events = action.payload;
      state.effects.loadEventListEffect.status = loadStatuses.LOAD_SUCCESS;
    });

    builder.addCase(createEvent.pending, (state) => {
      state.effects.createEventEffect.status = createStatuses.CREATING;
    });
    builder.addCase(createEvent.fulfilled, (state, action) => {
      state.events[action.payload.id] = action.payload;
      state.effects.createEventEffect.status = createStatuses.CREATION_SUCCESS;
    });

    builder.addCase(deleteEvent.pending, (state) => {
      state.effects.deleteEventEffect.status = deleteStatuses.DELETING;
    });
    builder.addCase(deleteEvent.fulfilled, (state, action) => {
      if (action.payload?.eventId) {
        delete state.events[action.payload.eventId];
        state.effects.deleteEventEffect.status =
          deleteStatuses.DELETION_SUCCESS;
      } else {
        state.effects.deleteEventEffect.status = deleteStatuses.DELETION_FAILED;
        state.effects.deleteEventEffect.error = action.payload.message;
      }
    });
  },
});

export default eventSlice.reducer;
