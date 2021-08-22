import { CircularProgress, Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import EventForm, { EventFormData } from '../../components/EventForm';
import FullSizeBackground from '../../components/FullSizeBackground';
import Sidebar from '../../components/Sidebar';
import { loadStatuses } from '../../constants';
import paths from '../../routes/paths';
import { State } from '../../store';
import { loadEventList, updateEvent } from '../../store/events';
import { getEvent, getLoadEventListStatus } from '../../store/events/selectors';

type UrlParams = {
  eventId: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
  })
);

const { NOT_LOADING, LOAD_SUCCESS } = loadStatuses;

const EventEdit = (): JSX.Element => {
  const classes = useStyles();
  const { eventId } = useParams<UrlParams>();
  const history = useHistory();
  const dispatch = useDispatch();

  const loadEventListStatus = useSelector(getLoadEventListStatus);
  const event = useSelector((state: State) => getEvent(state, eventId));

  const initialFormData: EventFormData = {
    name: event?.name,
    draft: false,
    description: event?.description,
    startDate: null,
    endDate: null,
    location: {
      latitude: event?.latitude,
      longitude: event?.longitude,
    },
  };

  const handleUpdateEvent = useCallback(
    (formData: EventFormData) => {
      dispatch(updateEvent({ eventId: Number(eventId), formData }));
      history.push({
        pathname: paths.root,
        state: { updatedEventName: formData.name },
      });
    },
    [dispatch, history]
  );

  useEffect(() => {
    if (loadEventListStatus === NOT_LOADING) {
      dispatch(loadEventList());
    }
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          {loadEventListStatus === LOAD_SUCCESS ? (
            <EventForm
              defaultValues={initialFormData}
              onSubmit={handleUpdateEvent}
            />
          ) : (
            <FullSizeBackground color="grey">
              <CircularProgress />
            </FullSizeBackground>
          )}
        </Container>
      </main>
    </div>
  );
};

export default EventEdit;
