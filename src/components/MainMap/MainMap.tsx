import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { useMap } from '../../hooks';
import { getEvents } from '../../store/events/selectors';

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

const MainMap = (): JSX.Element => {
  const classes = useStyles();
  const events = useSelector(getEvents);

  const mapContainerRef = useMap({
    latitude: Number(process.env.REACT_APP_MAIN_MAP_LAT),
    longitude: Number(process.env.REACT_APP_MAIN_MAP_LNG),
    zoom: Number(process.env.REACT_APP_MAIN_MAP_ZOOM),
    events,
    groupMarkers: true,
  });

  return (
    <div className={classes.mapContainer}>
      <div ref={mapContainerRef} className={classes.map} />
    </div>
  );
};

export default MainMap;
