import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';
import { pluck, slice } from '../lib';
import ProgressBar from './ProgressBar';
import {
  genreActions,
  artistActions,
  albumActions,
  trackActions
} from '../actions';

const loadingShape = PropTypes.shape({
  loading: PropTypes.bool,
  loaded:  PropTypes.bool,
  page:    PropTypes.number,
  pages:   PropTypes.number
});

@connect(state => {
  const toSlice = ['loading', 'loaded', 'page', 'pages'];

  return {
    genres:  slice(state.Genres, ...toSlice),
    artists: slice(state.Artists, ...toSlice),
    albums:  slice(state.Albums, ...toSlice),
    tracks:  slice(state.Tracks, ...toSlice)
  }
})
export default class Loader {
  static propTypes = {
    genres:  loadingShape.isRequired,
    artists: loadingShape.isRequired,
    albums:  loadingShape.isRequired,
    tracks:  loadingShape.isRequired
  }

  componentDidMount() {
    // Stagger the start of loading, starting with tracks, to keep the progress bar from jumping back and forth as we
    // get more page counts. The delay is arbitrary.
    const { dispatch } = this.props;
    const delay = 10;
    const fetchFor = (actions) => dispatch(actions.fetch());
    const delayIf  = (check, actions, offset) => {
      if (!check.loading && !check.loaded) {
        setTimeout(() => fetchFor(actions), delay * offset);
        return offset + 1;
      } else {
        return offset;
      }
    }

    let offset = 0;
    offset = delayIf(this.props.tracks, genreActions, offset);
    offset = delayIf(this.props.genres, trackActions, offset);
    offset = delayIf(this.props.artists, artistActions, offset);
    offset = delayIf(this.props.albums, albumActions, offset);
  }

  render() {
    const stores = Object.values(slice(this.props, 'genres', 'artists', 'albums', 'tracks'));

    const adder = (memo, current) => memo + (current || 0)
    const totalPages  = pluck(stores, 'pages').reduce(adder, 0);
    const loadedPages = pluck(stores, 'page').reduce(adder, 0);

    return <ProgressBar current={loadedPages} maximum={totalPages}/>;
  }
}
