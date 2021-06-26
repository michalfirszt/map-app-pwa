import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from './i18n';
import AppRoutes from './routes';
import createStore from './store';
import { lightTheme } from './theme';

const App = () => {
  return (
    <Provider store={createStore()}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <I18nextProvider i18n={i18n}>
          <AppRoutes />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
