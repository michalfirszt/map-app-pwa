import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import MainMap from '../../components/MainMap';
import Sidebar from '../../components/Sidebar';
import { loadEventList } from '../../store/events';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEventList());
  }, []);

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
