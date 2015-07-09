import { paginatedFetcher } from '../lib';
import {
  ARTIST_FETCH_START,
  ARTIST_FETCH_COMPLETE,
  ARTIST_FETCH_SUCCESS,
  ARTIST_FETCH_FAILURE
} from '../constants/actions';

export var fetch = paginatedFetcher('artists', [
  ARTIST_FETCH_START,
  ARTIST_FETCH_COMPLETE,
  ARTIST_FETCH_SUCCESS,
  ARTIST_FETCH_FAILURE
]);
