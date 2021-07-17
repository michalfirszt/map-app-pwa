export type Event = {
  id: number;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  description: string;
  active: boolean;
};

export type EventsData = { [key: string]: Event };

export type EventEffects = {
  loadEventListEffect: {
    status: string;
    error: null | string;
  };
  createEventEffect: {
    eventId: null | number;
    status: string;
    error: null | string;
  };
};

export type EventsState = {
  events: EventsData;
  effects: EventEffects;
};
