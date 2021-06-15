import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';
import { useEffect, useRef, useState } from 'react';

interface UseMapProps {
  mapContainerRef: React.RefObject<HTMLDivElement> | null;
}

export function useMap(): UseMapProps {
  const [wasMapRendered, setWasMapRendered] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current === null) {
      return;
    }

    if (wasMapRendered) {
      return;
    }

    const mainMap = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView(
      [
        Number(process.env.REACT_APP_MAIN_MAP_LAT),
        Number(process.env.REACT_APP_MAIN_MAP_LNG),
      ],
      Number(process.env.REACT_APP_MAIN_MAP_ZOOM)
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mainMap);

    L.control
      .zoom({
        position: 'topright',
      })
      .addTo(mainMap);

    setWasMapRendered(true);
  }, []);

  return { mapContainerRef };
}
