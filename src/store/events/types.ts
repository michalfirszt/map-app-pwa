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
    status: string;
    error: null | string;
  };
  updateEventEffect: {
    status: string;
    error: null | string;
  };
  deleteEventEffect: {
    status: string;
    error: null | string;
  };
};

export type EventsState = {
  events: EventsData;
  effects: EventEffects;
};
