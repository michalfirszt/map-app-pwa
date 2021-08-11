import { CircularProgress, makeStyles } from '@material-ui/core';
import { get, has } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMount } from 'react-use';

import FullSizeBackground from '../../components/FullSizeBackground';
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

const MapView = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const loadEventListStatus = useSelector(getLoadEventListStatus);

  useMount(() => {
    dispatch(loadEventList());
    if (has(location.state, 'newEventName')) {
      console.log(get(location.state, 'newEventName'));
    }
  });

  return (
    <div className={classes.root}>
      <Sidebar searchDisabled={false} />
      <main className={classes.content}>
        {loadEventListStatus === LOAD_SUCCESS ? (
          <MainMap />
        ) : (
          <FullSizeBackground color="grey">
            <CircularProgress />
          </FullSizeBackground>
        )}
      </main>
    </div>
  );
};

export default MapView;
