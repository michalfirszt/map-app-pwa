import React, { memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Counters from '../views/Counters';
import EventCreate from '../views/EventCreate';
import EventPreview from '../views/EventPreview';
import MapView from '../views/MapView';
import Register from '../views/Register/Register';
import paths from './paths';

const AppRoutes = memo(() => {
  return (
    <Router>
      <Switch>
        <Route path={paths.register}>
          <Register />
        </Route>
        <Route path={paths.counters}>
          <Counters />
        </Route>
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
