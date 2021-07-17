import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import { AppContextWrapper } from './contexts/AppContext';
import i18n from './i18n';
import AppRoutes from './routes';
import createStore from './store';
import { lightTheme } from './theme';

const App = (): ReactElement => {
  return (
    <Provider store={createStore()}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <AppContextWrapper>
          <I18nextProvider i18n={i18n}>
            <AppRoutes />
          </I18nextProvider>
        </AppContextWrapper>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
