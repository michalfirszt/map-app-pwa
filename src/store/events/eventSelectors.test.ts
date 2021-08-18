import { getEvent } from './selectors';

const mockEvents = {
  '1': {
    id: 1,
    name: 'test event',
    slug: 'test-event',
    latitude: 1,
    longitude: 1,
    description: 'description',
    active: true,
  },
  '2': {
    id: 2,
    name: 'test event2',
    slug: 'test-event2',
    latitude: 2,
    longitude: 2,
    description: 'description',
    active: true,
  },
};

describe('Event selectors', () => {
  test('should return selected event', () => {
    const selectorResult = getEvent.resultFunc(mockEvents, '2');

    expect(selectorResult).toEqual({
      id: 2,
      name: 'test event2',
      slug: 'test-event2',
      latitude: 2,
      longitude: 2,
      description: 'description',
      active: true,
    });
  });
});
