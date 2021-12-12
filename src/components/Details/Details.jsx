import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Details() {
   //alias HOOKS
  const dispatch = useDispatch();
  const history = useHistory();

   //global REDUCER that holds Detail ID
  const detailID = useSelector((store) => store.idDetailReducer);
  const movieDetails = useSelector((store) => store.movieDetailReducer);

  //local state for conditional render
  const [movieReady, setMovieReady] = useState('false');

  useEffect(() => {
    dispatch({
      type: 'FETCH_DETAIL',
      payload: detailID
    });
  }, []);

  const conditionalRender = () => {
    if (movieDetails === []){
      return <p>Hold on!</p>
    } else {
      return <div><img src={movieDetails[0].poster}/> <p>{movieDetails[0].description}</p></div>
    }
  }

  return (
    <div>
      {conditionalRender()}
        <h4>Genres:</h4>
        <ul>
          {movieDetails.map((movie) => {
            return(<li>{movie.name}</li>)
          })}
        </ul>
        
      
    </div>
  )
};

// {(movieDetails != []) ? <div><img src={movieDetails[0].poster}/> <p>{movieDetails[0].description}</p></div> : <p>Hold on!</p> }