import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';

import Sidebar from '../../components/Sidebar';
import { getSteps } from '../../store/steps/selector';

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

const Result = (): JSX.Element => {
  const classes = useStyles();
  const steps = useSelector(getSteps);

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          <div>{JSON.stringify(steps)}</div>
        </Container>
      </main>
    </div>
  );
};

export default Result;
