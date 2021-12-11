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
  const [movieCategory, setMovieCategory] = useState('');
  
  return(
    <div>
      <p>It's the Add Movie Form!</p>
      <form>
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
        <select name="categories" id="movieCategories">
          {/* Map through dbrow category result. Need Saga/Reducer */}
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </form>
    </div>
  )
}