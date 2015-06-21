import React from 'react';
import Router, { Route, Link, RouteHandler, DefaultRoute } from 'react-router';
import * as Flux from './flux';
import { AdminControls, Browse, PlayerStatus } from './components';

class Home extends React.Component {
  render() {
    return (
      <ul>
        <li><h2>Home</h2></li>
        <li><Link to="browse">Browse</Link></li>
        <li><Link to="queue">Queue</Link></li>
      </ul>
    );
  }
}
class Queue extends React.Component {
  render() {
    return (
      <ul>
        <li><h2>Queue</h2></li>
        <li><Link to="app">Home</Link></li>
        <li><Link to="browse">Browse</Link></li>
      </ul>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <section id="content">
          <RouteHandler />
        </section>
        <PlayerStatus />
        <AdminControls />
      </div>
    );
  }
}
let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="browse" handler={Browse} />
    <Route name="queue" handler={Queue} />
    <DefaultRoute handler={Home} />
  </Route>
);

Flux.start({
  genres:  GENRES,
  artists: ARTISTS,
  albums:  ALBUMS,
  tracks:  TRACKS
});
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});
