const paths = {
  root: '/',
  eventCreate: '/event/create',
  eventPreview: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}`,
};

export default paths;
