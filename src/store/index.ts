import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import events from './events';
import { EventsState } from './events/types';

export type State = {
  events: EventsState;
};

const createStore = () => {
  const reducer = combineReducers({ events });
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  });

  return store;
};

export default createStore;
