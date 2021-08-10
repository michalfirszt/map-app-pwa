import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTitle } from 'react-use';

import EventForm, { EventFormData } from '../../components/EventForm';
import Sidebar from '../../components/Sidebar';
import { tKeys } from '../../constants';
import paths from '../../routes/paths';
import { createEvent } from '../../store/events';

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

const EventCreate = (): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  useTitle(t(tKeys.CREATE_EVENT));

  const onFormSubmit = useCallback(
    (formData: EventFormData) => {
      dispatch(createEvent(formData));
      history.push({
        pathname: paths.root,
        state: { newEventName: formData.name },
      });
    },
    [dispatch, history]
  );

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          <EventForm onSubmit={onFormSubmit} />
        </Container>
      </main>
    </div>
  );
};

export default EventCreate;
