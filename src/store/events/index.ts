import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

type Event = {
  id: number;
  name: string;
  description: string;
};

type State = {
  events: Event[];
};

const initialState: State = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    loadEventList: (state) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/events`)
        .then((response) => {
          state.events = response.data;
        });
    },
  },
});

export const { loadEventList } = eventSlice.actions;
export default eventSlice.reducer;
