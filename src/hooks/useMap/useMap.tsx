import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
require('leaflet.markercluster');

import * as L from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';

import { blueIcon } from './icons';
import { UseMapProps } from './types';

export function useMap({
  latitude,
  longitude,
  zoom,
  markers,
  groupMarkers = false,
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

    if (markers) {
      const mapMarkers = markers.map((marker) =>
        L.marker([marker.latitude, marker.longitude], {
          icon: blueIcon,
        })
      );

      if (groupMarkers) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const markerCluster = L.markerClusterGroup();
        markerCluster.addLayers(mapMarkers);
        map.addLayer(markerCluster);
      } else {
        mapMarkers.forEach((marker) => marker.addTo(map));
      }
    }

    map.on('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { latlng } = event;
      onClickMap?.(map, latlng);
    });

    setWasMapRendered(true);
  }, [mapContainerRef.current]);

  return mapContainerRef;
}
