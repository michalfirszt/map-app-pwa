import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import events from './events';
import { EventsState } from './events/types';
import steps from './steps';

export type State = {
  events: EventsState;
  steps: { base: string; type: string };
};

const createStore = () => {
  const reducer = combineReducers({ events, steps });
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  });

  return store;
};

export default createStore;
