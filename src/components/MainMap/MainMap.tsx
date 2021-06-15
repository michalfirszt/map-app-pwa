import { makeStyles } from '@material-ui/core';

import { useMap } from '../../hooks';

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

  const { mapContainerRef } = useMap();

  return (
    <div className={classes.mapContainer}>
      <div ref={mapContainerRef} className={classes.map} />
    </div>
  );
};

export default MainMap;
