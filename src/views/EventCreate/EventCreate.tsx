import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import EventForm, { EventFormData } from '../../components/EventForm';
import Sidebar from '../../components/Sidebar';

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

const EventCreate = (): ReactElement => {
  const classes = useStyles();

  const initialFormState: EventFormData = {
    name: '',
    description: '',
    latitude: null,
    longitude: null,
  };

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          <EventForm defaultValues={initialFormState} />
        </Container>
      </main>
    </div>
  );
};

export default EventCreate;
