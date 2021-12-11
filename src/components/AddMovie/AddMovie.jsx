import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';


export default function AddMovie() {
  //alias HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

  //global REDUCER that holds Movie Categories
  const genres = useSelector((store) => store.genresReducer)

  //local state for managing inputs
  const [movieTitle, setMovieTitle] = useState('');
  const [moviePoster, setMoviePoster] = useState('');
  const [movieSummary, setMovieSummary] = useState('');
  const [movieGenre, setMovieGenre] = useState('');
  
  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

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
        genre_id: movieGenre
      }
    })
  }

  //Function handles Genre selection
  const handleGenre = (e) => {
    console.log(e.target.value);
    setMovieGenre(e.target.value);
  }

  //Function handles nav back to main view
  const handleCancel = () => {
    history.push('/')
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
        <select 
          formLabel="Select a Genre"
          onChange={handleGenre}
          name="genres" 
          id="movieGenres">
          {/* Map through dbrow category result. Need Saga/Reducer */}
          <option value="42">Select Genre</option>
          {genres.map((genre) => {
            return <option value={genre.id}>{genre.name}</option>
          })}
        </select>
        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}