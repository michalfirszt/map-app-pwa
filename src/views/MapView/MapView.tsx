import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MainMap from '../../components/MainMap';
import Sidebar from '../../components/Sidebar';
import { loadStatuses } from '../../constants';
import { loadEventList } from '../../store/events';
import { getLoadEventListStatus } from '../../store/events/selectors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
}));

const { LOAD_SUCCESS } = loadStatuses;

const MapView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const loadEventListStatus = useSelector(getLoadEventListStatus);

  useEffect(() => {
    dispatch(loadEventList());
  }, []);

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        {loadEventListStatus === LOAD_SUCCESS ? (
          <MainMap />
        ) : (
          <CircularProgress />
        )}
      </main>
    </div>
  );
};

export default MapView;
