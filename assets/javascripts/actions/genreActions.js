import { paginatedFetcher } from '../lib';
import {
  GENRE_FETCH_START,
  GENRE_FETCH_COMPLETE,
  GENRE_FETCH_SUCCESS,
  GENRE_FETCH_FAILURE
} from '../constants/actions';

export var fetch = paginatedFetcher('genres', [
  GENRE_FETCH_START,
  GENRE_FETCH_COMPLETE,
  GENRE_FETCH_SUCCESS,
  GENRE_FETCH_FAILURE
]);
