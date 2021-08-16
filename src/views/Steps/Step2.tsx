import { Button, Container, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import paths from '../../routes/paths';
import { setType } from '../../store/steps';

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

const Step2 = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, register } = useForm();

  const onSubmit = useCallback(
    ({ type }) => {
      dispatch(setType(type));
      history.push(paths.stepResult);
    },
    [dispatch]
  );

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Type"
              name="type"
              inputProps={{ ...register('type') }}
              required
            />
            <Button type="submit">Next</Button>
          </form>
        </Container>
      </main>
    </div>
  );
};

export default Step2;
