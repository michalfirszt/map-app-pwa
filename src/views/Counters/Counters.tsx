import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import { ClassCounter, FunctionCounter } from '../../components/Counters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    counterItem: {
      padding: theme.spacing(4),
    },
  })
);

const Counters = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.counterItem}>
        <ClassCounter value={10} />
      </div>
      <div className={classes.counterItem}>
        <FunctionCounter value={10} />
      </div>
    </div>
  );
};

export default Counters;
