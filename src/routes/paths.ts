const paths = {
  root: '/',
  register: '/register',
  counters: '/counters',
  eventCreate: '/event/create',
  eventEdit: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}/edit`,
  eventPreview: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}`,
};

export default paths;
