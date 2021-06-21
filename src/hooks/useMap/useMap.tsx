import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

interface UseMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

export function useMap(props: UseMapProps): React.RefObject<HTMLDivElement> {
  const [wasMapRendered, setWasMapRendered] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { latitude, longitude, zoom } = props;

  useEffect(() => {
    if (mapContainerRef.current === null) {
      return;
    }

    if (wasMapRendered) {
      return;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([latitude, longitude], zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(map);

    setWasMapRendered(true);
  }, [mapContainerRef.current]);

  return mapContainerRef;
}
