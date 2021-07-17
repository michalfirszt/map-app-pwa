import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';

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

const EventPreview = (): ReactElement => {
  const classes = useStyles();
  const { eventId } = useParams<UrlParams>();

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>Event id: {eventId}</Container>
      </main>
    </div>
  );
};

export default EventPreview;
