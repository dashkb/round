import { paginatedFetcher } from '../lib';
import {
  TRACK_FETCH_START,
  TRACK_FETCH_COMPLETE,
  TRACK_FETCH_SUCCESS,
  TRACK_FETCH_FAILURE
} from '../constants/actions';

export var fetch = paginatedFetcher('tracks', [
  TRACK_FETCH_START,
  TRACK_FETCH_COMPLETE,
  TRACK_FETCH_SUCCESS,
  TRACK_FETCH_FAILURE
]);
