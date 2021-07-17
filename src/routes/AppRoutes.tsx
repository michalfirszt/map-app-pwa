import React, { memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import EventCreate from '../views/EventCreate';
import EventPreview from '../views/EventPreview';
import MapView from '../views/MapView';
import paths from './paths';

const AppRoutes = memo(() => {
  return (
    <Router>
      <Switch>
        <Route path={paths.eventCreate}>
          <EventCreate />
        </Route>
        <Route path={paths.eventPreview()}>
          <EventPreview />
        </Route>
        <Route path={paths.root}>
          <MapView />
        </Route>
      </Switch>
    </Router>
  );
});

export default AppRoutes;
