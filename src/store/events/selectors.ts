import { values } from 'lodash';
import { createSelector } from 'reselect';

import { State } from '../index';
import { EventEffects, EventsData } from './types';

export const getEvents = (state: State): EventsData => state.events.events;
export const getEventEffects = (state: State): EventEffects =>
  state.events.effects;

export const getEventList = createSelector(getEvents, (events) =>
  values(events)
);

export const getEvent = createSelector(
  getEvents,
  (state: State, eventId: string) => eventId,
  (events, eventId) => events[eventId]
);

export const getLoadEventListStatus = createSelector(
  getEventEffects,
  (eventEffects) => eventEffects.loadEventListEffect.status
);
