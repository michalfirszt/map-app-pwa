import { makeStyles } from '@material-ui/core';
import React from 'react';

import MainMap from '../../components/MainMap';
import Sidebar from '../../components/Sidebar';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
}));

const MapView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <MainMap />
      </main>
    </div>
  );
};

export default MapView;
