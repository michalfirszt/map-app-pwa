const paths = {
  root: '/',
  register: '/register',
  counters: '/counters',
  eventCreate: '/event/create',
  eventEdit: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}/edit`,
  eventPreview: (eventId: number | null = null): string =>
    `/event/${eventId ?? ':eventId'}`,
  //Steps
  step1: '/step1',
  step2: '/step2',
  stepResult: '/stepResult',
};

export default paths;
