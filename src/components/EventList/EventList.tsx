import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { values } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import paths from '../../routes/paths';
import { deleteEvent } from '../../store/events';
import { getEvents } from '../../store/events/selectors';

const useStyles = makeStyles(() =>
  createStyles({
    eventList: {
      width: '100%',
      height: '500px',
      overflowY: 'auto',
    },
  })
);

const EventList = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const events = useSelector(getEvents);

  const handleEventDelete = useCallback(
    (eventId: number) => {
      dispatch(deleteEvent(eventId));
    },
    [dispatch]
  );

  const eventList: JSX.Element = useMemo(
    () => (
      <List>
        {values(events).map((event, index) => (
          <ListItem
            key={index}
            button
            onClick={() => history.push(paths.eventPreview(event.id))}
          >
            <ListItemText primary={event.name} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => history.push(paths.eventEdit(event.id))}
              >
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleEventDelete(event.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    ),
    [events]
  );

  return (
    <div className={classes.eventList} data-testid="event-list">
      {eventList}
    </div>
  );
};

export default EventList;
