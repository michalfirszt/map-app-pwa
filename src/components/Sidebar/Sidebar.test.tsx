import { ThemeProvider } from '@material-ui/core';
import { fireEvent, render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from '../../i18n';
import createStore from '../../store';
import { lightTheme } from '../../theme';
import Sidebar from './Sidebar';

const renderComponent = () =>
  render(
    <Provider store={createStore()}>
      <ThemeProvider theme={lightTheme}>
        <I18nextProvider i18n={i18n}>
          <Sidebar />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  );

describe('Sidebar elements', () => {
  test('Active sidebar elements', () => {
    const { getByTestId } = renderComponent();

    const sidebarList = getByTestId('sidebar-list');
    expect(sidebarList.children).toHaveLength(3);

    expect(sidebarList.children[0]).toHaveTextContent('Map');
    expect(sidebarList.children[1]).toHaveTextContent('Events');
    expect(sidebarList.children[2]).toHaveTextContent('Create event');
  });

  test('Show list of events dialog', () => {
    const { getByTestId } = renderComponent();

    const sidebarList = getByTestId('sidebar-list');

    fireEvent.click(sidebarList.children[1]);

    expect(getByTestId('event-list')).toBeInTheDocument();
  });
});
