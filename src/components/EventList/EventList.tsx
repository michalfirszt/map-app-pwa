import { List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { values } from 'lodash';
import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

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

const EventList = (): ReactElement => {
  const classes = useStyles();
  const events = useSelector(getEvents);

  const eventList: ReactElement = useMemo(
    () => (
      <List>
        {values(events).map((event) => (
          <ListItem>
            <ListItemText primary={event.name} />
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
