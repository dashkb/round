import { paginatedFetcher } from '../lib';
import {
  ALBUM_FETCH_START,
  ALBUM_FETCH_COMPLETE,
  ALBUM_FETCH_SUCCESS,
  ALBUM_FETCH_FAILURE
} from '../constants/actions';

export var fetch = paginatedFetcher('albums', [
  ALBUM_FETCH_START,
  ALBUM_FETCH_COMPLETE,
  ALBUM_FETCH_SUCCESS,
  ALBUM_FETCH_FAILURE
]);
