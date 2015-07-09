import {
  BROWSE_SELECT_GENRE,
  BROWSE_SELECT_ARTIST,
  BROWSE_SET_SEARCH
} from '../constants/actions';

export function selectGenre(id) {
  return {
    id,
    type: BROWSE_SELECT_GENRE
  };
}
export function selectArtist(id) {
  return {
    id,
    type: BROWSE_SELECT_ARTIST
  };
}
export function setSearch(search) {
  return {
    search,
    type: BROWSE_SET_SEARCH
  }
}
