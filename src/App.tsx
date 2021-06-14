import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { lightTheme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
