import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import events from './events';

const createStore = () => {
  const reducer = combineReducers({ events });
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()],
  });

  return store;
};

export default createStore;
