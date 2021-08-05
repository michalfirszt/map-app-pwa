const paths = {
  root: '/',
  register: '/register',
  counters: '/counters',
  eventCreate: '/event/create',
  eventPreview: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}`,
};

export default paths;
