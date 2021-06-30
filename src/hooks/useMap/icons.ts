import * as L from 'leaflet';
import marketIcon from 'leaflet/dist/images/marker-icon.png';
import marketShadow from 'leaflet/dist/images/marker-shadow.png';

export const blueIcon = L.icon({
  iconUrl: marketIcon,
  shadowUrl: marketShadow,
});
