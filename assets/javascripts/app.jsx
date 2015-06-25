import React from 'react';
import Router, { Route, RouteHandler, DefaultRoute } from 'react-router';
import Component from './component';
import * as Flux from './flux';
import { AdminControls, Browse, NowPlaying, PlayerStatus, Queue } from './components';

class App extends Component {
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
    <DefaultRoute handler={NowPlaying} />
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
