import React from 'react';
import Router from 'react-router';
import BrowserHistory from 'react-router/lib/HashHistory';
import { createRedux  } from 'redux';
import { connect, provide } from 'redux/react';

import Loader from './components/Loader';
import routes from './views/routes';
import * as stores from './stores';
import { statusActions } from './actions';

const history = new BrowserHistory();
const redux = createRedux(stores);

@provide(redux)
@connect(state => ({
  loaded: (state.Genres.loaded
           && state.Artists.loaded
           && state.Albums.loaded
           && state.Tracks.loaded)
}))
class SplashScreen {
  static propTypes = {
    loaded: React.PropTypes.bool.isRequired
  }

  render() {
    if (this.props.loaded) {
      return <Router history={history} children={routes} />;
    } else {
      return <Loader />;
    }
  }
}

// The streaming is always used for the player status stuff, so we start it at boot time and never stop it!
redux.dispatch(statusActions.startStream());
React.render(<SplashScreen />, document.body);
