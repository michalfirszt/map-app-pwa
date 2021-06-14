import 'leaflet/dist/leaflet.css';

import { makeStyles } from '@material-ui/core';
import * as L from 'leaflet';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  map: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
  },
  mapContainer: {
    width: '100vw',
    height: '100vh',
  },
}));

const MainMap = () => {
  const classes = useStyles();

  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isMapReady) {
      const mainMap = L.map('mainMap', { zoomControl: false }).setView(
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

      setIsMapReady(true);
    }
  }, []);

  return (
    <div className={classes.mapContainer}>
      <div id="mainMap" className={classes.map} />
    </div>
  );
};

export default MainMap;
