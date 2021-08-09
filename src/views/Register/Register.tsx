import { Container } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import RegisterForm from '../../components/RegisterForm/RegisterForm';
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

const Register = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />
      <main className={classes.content}>
        <Container>
          <RegisterForm />
        </Container>
      </main>
    </div>
  );
};

export default Register;
