export type Latlng = { lat: number; lng: number };

export type UseMapProps = {
  latitude: number;
  longitude: number;
  zoom: number;
  markers?: Array<{ latitude: number; longitude: number }>;
  groupMarkers?: boolean;
  onClickMap?: (map: any, latlng: Latlng) => void;
};
