import React from 'react';
import { Route } from 'react-router';
import App from './App';
import NowPlaying from './NowPlaying';
import Browse from './Browse';
import Queue from './Queue';
import Admin from './Admin';

export default (
  <Route component={App}>
    <Route path="/" component={NowPlaying} />
    <Route path="/browse" component={Browse} />
    <Route path="/queue" component={Queue} />
    <Route path="/admin" component={Admin} />
  </Route>
);
