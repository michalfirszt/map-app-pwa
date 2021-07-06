import { EventsData } from '../../store/events/types';

export type Latlng = { lat: number; lng: number };

export type UseMapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
  events?: EventsData;
  groupMarkers?: boolean;
  onClickMap?: (map: any, latlng: Latlng) => void;
};
