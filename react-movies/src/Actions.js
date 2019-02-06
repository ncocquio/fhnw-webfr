export const IS_LOADING = 'IS_LOADING';
export const SET_MOVIES = 'SET_MOVIES';
export const UPDATE_FITER_TERM = 'UPDATE_FITER_TERM';

export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool
  };
}

export function getMoviesFromApi(uri) {
  return (dispatch) => {
    dispatch(isLoading(true));

    fetch(uri)
      .then(response => response.json())
      .then(movies => {
        dispatch(isLoading(false));
        dispatch(setMoviesInStore(movies))
      })
  }
}

export function setMoviesInStore(movies) {
  return {
    type: SET_MOVIES,
    movies: movies
  };
}

export function updateFilterTerm(event) {
  return {
    type: UPDATE_FITER_TERM,
    term: event.target.value
  }
}