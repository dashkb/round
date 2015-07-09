import client from './client';

function paginatedFetch(options) {
  const { dispatch, pageNumber, perPage, path, action } = options;
  const [ START, COMPLETE, SUCCESS, FAILURE ] = options.types;

  function success(result) {
    dispatch({
      ...result,
      type: SUCCESS
    });

    if (result.page < result.pages) {
      dispatch(action(pageNumber + 1, perPage));
    } else {
      dispatch({type: COMPLETE});
    }
  }
  function failure(error) {
    dispatch({
      type: FAILURE,
      error: error
    })
  }

  dispatch({type: START});
  client.get(`${path}?page=${pageNumber}&per_page=${perPage}`)
    .then(success, failure);
}

export default function paginatedFetcher(path, actions) {
  return function fetch(pageNumber = 1, perPage = 250) {
    return dispatch => paginatedFetch({
      dispatch, pageNumber, perPage,
      action: fetch,
      types:  actions,
      path:   path
    });
  };
}
