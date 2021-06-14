import { Router } from '@reach/router';
import React, { memo } from 'react';

import MapView from '../views/MapView';

const AppRoutes = memo(() => {
  return (
    <Router>
      <MapView path="/" />
    </Router>
  );
});

export default AppRoutes;
