import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';
import { values } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { EventsData } from '../../store/events/types';

interface UseMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  events?: EventsData;
  onClickMap?: (lat: number, lng: number) => void;
}

export function useMap({
  latitude,
  longitude,
  zoom,
  events,
  onClickMap,
}: UseMapProps): React.RefObject<HTMLDivElement> {
  const [wasMapRendered, setWasMapRendered] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

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

    if (events) {
      values(events).forEach((event) => {
        if (event.active) {
          L.marker([event.latitude, event.longitude]).addTo(map);
        }
      });
    }

    map.on('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { lat, lng } = event.latlng;
      onClickMap?.(lat, lng);
    });

    setWasMapRendered(true);
  }, [mapContainerRef.current]);

  return mapContainerRef;
}
