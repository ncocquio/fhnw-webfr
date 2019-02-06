import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import App from './App';
import { getMoviesFromApi, UPDATE_FITER_TERM, IS_LOADING, SET_MOVIES } from './Actions'

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_FITER_TERM: {
      return { ...state, term: action.term };
    }
    case IS_LOADING: {
      return { ...state, isLoading: action.isLoading };
    }
    case SET_MOVIES: {
      return { ...state, movies: action.movies };
    }
    default:
      return state;
  }
}

const initialState = {
  movies: [ ],
  isLoading: true
}

const store = createStore(reducer, initialState, applyMiddleware(thunk))

store.dispatch(getMoviesFromApi("https://softwarelab.ch/api/public/v1/movies"))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
