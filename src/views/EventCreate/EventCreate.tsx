import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';

import EventForm, { EventFormData } from '../../components/EventForm';
import Sidebar from '../../components/Sidebar';
import { tKeys } from '../../constants';

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
  const { t } = useTranslation();

  const initialFormState: EventFormData = {
    name: '',
    description: '',
    latitude: null,
    longitude: null,
  };

  useTitle(t(tKeys.CREATE_EVENT));

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
