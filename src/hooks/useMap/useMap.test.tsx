import { render } from '@testing-library/react';

import { useMap } from './useMap';

test('allows you to spawn Leaflet map to a div element', () => {
  const mapConfig = {
    longitude: 50,
    latitude: 50,
    zoom: 7,
  };

  const ComponentWithUseMapHook = () => {
    const mapContainerRef = useMap(mapConfig);

    return <div ref={mapContainerRef} />;
  };

  const { container } = render(<ComponentWithUseMapHook />);

  expect(container.firstChild.querySelectorAll('div').length).toBeGreaterThan(
    0
  );

  expect(
    container.firstChild.querySelector('.leaflet-pane')
  ).toBeInTheDocument();
});
