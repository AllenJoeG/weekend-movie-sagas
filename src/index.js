import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

//MUI
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#482880',
      main: '#673ab7',
      dark: '#8561c5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#598e89',
      main: '#80cbc4',
      dark: '#99d5cf',
      contrastText: '#000',
    },
  },
});



// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('ADD_MOVIE', postNewMovie);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('FETCH_DETAIL', fetchMovieDetails)
}

//SAGA
// Fetch details of specific movie
function* fetchMovieDetails(action) {
  console.log('in fetchMovieDetails with ID', action.payload);
  try {
    const movie = yield axios.get(`api/movie/${action.payload}`)
    yield put({ type: 'STORE_MOVIE_DETAILS', payload: movie.data });
  } catch(error) {
    console.log('error with GET from server', error);
  }
}

//SAGA
// get all movies from the DB
function* fetchAllMovies() {
  console.log('in fetchAllMovies');
  try {
    const movies = yield axios.get('/api/movie');
    // console.log('get all:', movies.data);
    yield put({ type: 'SET_MOVIES', payload: movies.data });
  } catch(error) {
    console.log('issue with GET from server', error);
  }
}

//SAGA
// get all genres from the DB
function* fetchAllGenres() {
  console.log('in fetchAllGenres');
  try {
    const genres = yield axios.get('/api/genre');
    console.log('get all:', genres.data);
    yield put({ type: 'SET_GENRES', payload: genres.data });
  } catch(error) {
    console.log('issue with GET from server', error);
  }
}

//SAGA
// post new movie from user input in AddMovie
function* postNewMovie(action) {
  console.log('in postNewMovie with:', action.payload)
  try {
    const response = yield axios({
      method: 'POST',
      url: '/api/movie',
      data: action.payload
    })
  } catch(error) {
    console.log('issue with POST to Server', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//REDUCER
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

//REDUCER
// Holds specific Movie info for Details page
const movieDetailReducer = (state = [], action) => {
  switch (action.type) {
    case 'STORE_MOVIE_DETAILS':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}

//REDUCER
// Holds the clicked movie.id for Details page
const idDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STORE_DETAIL_ID':
      console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}

//REDUCER
// Used to store the movie genres
const genresReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// REDUX store that combines all Reducers for Component access
const storeInstance = createStore(
    combineReducers({
        movies,
        genresReducer,
        idDetailReducer,
        movieDetailReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={storeInstance}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
