import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';


export default function AddMovie() {
  //alias HOOKS
  const dispatch = useDispatch();

  //global REDUCER that holds Movie Categories

  //local state for managing inputs
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieSummary, setMovieSummary] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  
  //Function to handle AddMovie
  //Dispatches to SAGA that POSTS to server for query add to DB
  const handleAddMovie = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_MOVIE',
      payload: {
        title: movieTitle,
        poster: moviePoster,
        description: movieSummary,
        genre_id: 5
      }
    })
  }

  return(
    <div>
      <p>It's the Add Movie Form!</p>
      <form onSubmit={handleAddMovie}>
        <input
            type='text'
            placeholder='Movie Title' 
            value={movieTitle} 
            onChange={e => setMovieTitle(e.target.value)}
        />
        <input
            type='text'
            placeholder='Poster URL' 
            value={moviePoster} 
            onChange={e => setMoviePoster(e.target.value)}
        />
        <textarea
            type='text'
            placeholder='Movie Summary' 
            value={movieSummary} 
            onChange={e => setMovieSummary(e.target.value)}
        />
        <select name="genres" id="movieGenres">
          {/* Map through dbrow category result. Need Saga/Reducer */}
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <button>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}