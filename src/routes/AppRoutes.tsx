import React, { memo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import MapView from '../views/MapView';

const AppRoutes = memo(() => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MapView />
        </Route>
      </Switch>
    </Router>
  );
});

export default AppRoutes;
