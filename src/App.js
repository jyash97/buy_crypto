import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NotFound from './NotFound';
import Home from './Home';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
